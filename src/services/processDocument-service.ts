import admin from 'firebase-admin';

class DocumentProcessor {
    private data: { email?: string, nome?: string, codigoTurma?: string };

    constructor(params: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData, admin.firestore.DocumentData>) {
        if (params.exists) {
            this.data = params.data() as { email?: string, nome?: string, codigoTurma?: string };
            delete this.data.email;
            delete this.data.nome;
        } else {
            console.log('Nenhum documento encontrado');
            this.data = {};
        }
    }

    getFields(): string[] {
        return Object.values(this.data.codigoTurma || {});
    }

    getLength(): number {
        const numFields = Object.keys(this.data.codigoTurma || {}).length + 1;
        console.log(`O documento contém ${numFields} campos.`);
        return numFields;
    }
}

export default DocumentProcessor;