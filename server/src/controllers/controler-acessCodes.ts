// import admin from 'firebase-admin';
import db from "@src/database/fireStore-config"
import { getUIDFromSession } from '@src/services/getUid-service';
import DocumentProcessor from '@src/services/processDocument-service';
import UserSession from '@src/services/getUid-service';
import { Response, Request } from 'express';

class AccesCodesController {
    async getAccesCode(req: Request, res: Response){
        const userSession = new UserSession(req);

        userSession.getUserInfo().then(async (userInfo) => { 
          const adminAccesCode = db.collection('administradores').doc(userInfo.uid).collection('livrosAdm').doc('accessCode');          
          const doc = await adminAccesCode.get();
          if (doc.exists) {
            const code = doc.data();
            res.json({code});
          } else {
            console.log('No such document!');
          }
          
        }).catch(error => {
          console.error('Erro ao recuperar as informações do usuário:', error);
        });
    }

    async getClassCode(req: Request, res: Response) {
        const { accessCode } = req.body;
        // console.log(accessCode);
        findCollectionByAccessCode(accessCode).then((docNameId) => {
            console.log(accessCode);
            console.log(docNameId);

            getUIDFromSession(req).then(async (uid: string) => { 
              const adminAccesCode = db.collection('usuarios').doc(uid).collection('turmas').doc('turma');

              const doc = await adminAccesCode.get();

              const processorLenght = new DocumentProcessor(doc)

              const lenght = ` codigoTurma.${processorLenght.getLength()}`
              console.log(processorLenght);
              const data = {
                  [lenght.trim()]: docNameId
              };

              await adminAccesCode.update(data);
              // await adminAccesCode.set(data, { merge: true });

              console.log('Documento adicionado com sucesso!');


            }).catch(error => {
              console.error('Erro ao recuperar as informações do usuário:', error);
            });
            
            res.json({ docNameId });
        })

    }

  async getSavedClass(req: Request, res: Response) {
    getUIDFromSession(req).then(async (uid: string) => {
      const adminAccesCodeUser = db.collection('usuarios').doc(uid).collection('turmas').doc('turma');

      const doc = await adminAccesCodeUser.get();

      const processorField = new DocumentProcessor(doc);

      const roomCodes = processorField.getFields();
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
        console.log(results); 
        res.json(results);
      });
    }).catch(error => {
      console.error('Erro ao recuperar as informações do usuário:', error);
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
