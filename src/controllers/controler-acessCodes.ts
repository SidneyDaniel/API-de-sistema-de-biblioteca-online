import admin from 'firebase-admin';
import db from "@src/database/fireStore-config"
import { Response, Request } from 'express';

class AccesCodesController {
    async getAccesCode(req: Request, res: Response){
        const cookieHeader = req.headers.cookie || '';
        const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
        const sessionCookie = cookies.find(cookie => cookie.startsWith('session='));
        const sessionValue = sessionCookie ? sessionCookie.split('=')[1] : '';
    
        admin.auth()
          .verifySessionCookie(sessionValue, true)
          .then((decodedClaims) => {
            admin.auth().getUserByEmail( decodedClaims?.email || '')
            .then( async (userRecord)=> {
              const adminAccesCode = db.collection('administradores').doc(userRecord.uid).collection('livrosAdm').doc('accessCode');          
              const doc = await adminAccesCode.get();
              if (doc.exists) {
                const code = doc.data();
                res.json({code});
              } else {
                console.log('No such document!');
              }
            })
            .catch(error => {
              console.error('Erro ao recuperar as informações do usuário:', error);
            });
          })
          .catch((error) => {
            console.log(error);
            
          });
    }

    async getClassCode(req: Request, res: Response) {
        const { accessCode } = req.body;
        // console.log(accessCode);
        findCollectionByAccessCode(accessCode).then((docNameId) => {
            console.log(accessCode);
            console.log(docNameId);

            // ======================
            const cookieHeader = req.headers.cookie || '';
            const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
            const sessionCookie = cookies.find(cookie => cookie.startsWith('session='));
            const sessionValue = sessionCookie ? sessionCookie.split('=')[1] : '';

            admin.auth()
                .verifySessionCookie(sessionValue, true)
                .then((decodedClaims) => {
                    admin.auth().getUserByEmail(decodedClaims?.email || '')
                        .then(async (userRecord) => {
                            const adminAccesCode = db.collection('usuarios').doc(userRecord.uid).collection('turmas').doc('turma');

                            const doc = await adminAccesCode.get();

                            function docLenght(params: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData, admin.firestore.DocumentData>) {
                                if (params.exists) {
                                    const data = doc.data() as {email?: string, nome?: string, codigoTurma?: string  };

                                    delete data.email;
                                    delete data.nome;

                                    const numFields = Object.keys(data.codigoTurma || {}).length + 1;
                                    console.log(`O documento contém ${numFields} campos.`);

                                    return numFields;
                                } else {
                                    console.log('Nenhum documento encontrado');
                                    return 0;
                                }
                            }

                            const lenght = ` codigoTurma.${docLenght(doc)}`
                            console.log(docLenght(doc));
                            // Aqui estamos definindo alguns dados de exemplo para adicionar ao documento
                            const data = {
                                [lenght.trim()]: docNameId
                                // adicione mais campos conforme necessário
                            };

                            // Use o método set() para adicionar um novo documento
                            await adminAccesCode.update(data);
                            // await adminAccesCode.set(data, { merge: true });

                            console.log('Documento adicionado com sucesso!');
                        })
                        .catch(error => {
                            console.error('Erro ao recuperar as informações do usuário:', error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
            //========================



            res.json({ docNameId });
        })

    }

    async getSavedClass(req: Request ,res: Response){
      const cookieHeader = req.headers.cookie || '';
      const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
      const sessionCookie = cookies.find(cookie => cookie.startsWith('session='));
      const sessionValue = sessionCookie ? sessionCookie.split('=')[1] : '';
  
      admin.auth()
        .verifySessionCookie(sessionValue, true)
        .then((decodedClaims) => {
          admin.auth().getUserByEmail(decodedClaims?.email || '')
          .then(async (userRecord) => {
            const adminAccesCodeUser = db.collection('usuarios').doc(userRecord.uid).collection('turmas').doc('turma');
            
            const doc = await adminAccesCodeUser.get();
  
            function fieldsValues(params: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData, admin.firestore.DocumentData>) {
                if (params.exists) {
                  const data = doc.data() as {email?: string, nome?: string, codigoTurma?: string  };
  
                  delete data.email;
                  delete data.nome;
                 
                  const fields = Object.values(data.codigoTurma || {})
                 
                  return fields;
                } else {
                  console.log('Nenhum documento encontrado');
                  return [];
                }
            }
  
  
            const roomCodes = fieldsValues(doc) 
  
            console.log(roomCodes);
  
            const allDocs = roomCodes.map((docName: string) => {
              const docsInCollection: Array<object> = [];
              const collectionRef = db.collection('administradores').doc(docName).collection('livrosAdm');
              return collectionRef.get().then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                      docsInCollection.push(doc.data());
                  });
                  return docsInCollection;
              }).catch((error) => {
                  console.log("Erro ao obter documentos: ", error);
              });
            });
            
            Promise.all(allDocs).then((results) => {
                console.log(results); // Imprime os dados de todos os documentos recuperados
                res.json(results);
            });
          })
          .catch(error => {
            console.error('Erro ao recuperar as informações do usuário:', error);
          });
        })
        .catch((error) => {
          console.log(error);
        });
      
    }

}

interface docRefId{
  id: string
}

interface collectionItem {
  docName: string;
  accessCode: string;
}

async function findAllCollectionAndAccessCode(): Promise<object[]> {
  const allCodes: Array<collectionItem> = [];
  const collectionRef = db.collectionGroup('livrosAdm');

  // Retorne a promessa para que você possa esperar por ela mais tarde
  try {
    const querySnapshot = await collectionRef.get();
    querySnapshot.forEach(doc => {
      const parentDocRef  = doc?.ref.parent?.parent as docRefId;
      // console.log(`Documento ID: ${doc.id}, Nome do documento pai: ${parentDocRef.id}, Dados: ${JSON.stringify(doc.data())}`);
      
      allCodes.push({
        docName: parentDocRef.id,
        accessCode: doc.data().accessCode
      });
    });
    return allCodes;
  } catch (error) {
    console.error('Erro ao obter documentos', error);
    return [];
  }     
  
}

async function findCollectionByAccessCode(accessCodes: string): Promise<string> {
  const subColletions: Array<collectionItem> = await findAllCollectionAndAccessCode() as Array<collectionItem>;  
  const docNameId = subColletions.find((docName) => docName.accessCode === accessCodes)?.docName;
  return docNameId || '';
}


export default AccesCodesController;
