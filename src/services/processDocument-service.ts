//Por função?:

// function processDocument(params: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData, admin.firestore.DocumentData>, returnType: 'fields' | 'length') {
//     if (params.exists) {
//         const data = params.data() as { email?: string, nome?: string, codigoTurma?: string };

//         delete data.email;
//         delete data.nome;

//         if (returnType === 'fields') {
//             const fields = Object.values(data.codigoTurma || {});
//             return fields;
//         } else if (returnType === 'length') {
//             const numFields = Object.keys(data.codigoTurma || {}).length + 1;
//             console.log(`O documento contém ${numFields} campos.`);
//             return numFields;
//         }
//     } else {
//         console.log('Nenhum documento encontrado');
//         return returnType === 'fields' ? [] : 0;
//     }

//Uso ?

// const fields = processDocument(docSnapshot, 'fields');
// const length = processDocument(docSnapshot, 'length');


// classe ?

// class DocumentProcessor {
//     private data: { email?: string, nome?: string, codigoTurma?: string };

//     constructor(params: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData, admin.firestore.DocumentData>) {
//         if (params.exists) {
//             this.data = params.data() as { email?: string, nome?: string, codigoTurma?: string };
//             delete this.data.email;
//             delete this.data.nome;
//         } else {
//             console.log('Nenhum documento encontrado');
//             this.data = {};
//         }
//     }

//     getFields(): string[] {
//         return Object.values(this.data.codigoTurma || {});
//     }

//     getLength(): number {
//         const numFields = Object.keys(this.data.codigoTurma || {}).length + 1;
//         console.log(`O documento contém ${numFields} campos.`);
//         return numFields;
//     }
// }

// Uso ?:


// const processor = new DocumentProcessor(docSnapshot);
// const fields = processor.getFields();
// const length = processor.getLength();
