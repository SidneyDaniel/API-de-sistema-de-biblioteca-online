import router from "@/router"
import { useAuthStore } from '@/stores/auth';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import type { FirebaseError } from "firebase/app";

// interface fireBaseError extends Error {
//   code: string
// }

class AuthService {
    private _email: string
    private _password: string

    constructor(params: {email: string, password: string}){
        this._email = params.email
        this._password = params.password
    } 

    public get email(): string {
      return this._email
    }

    public set email(value: string ) {
      if (value) {
        // Validação simples de email
        if (!/\S+@\S+\.\S+/.test(value)) {
          throw new Error('Email inválido');
        }
        this._email = value;
      }
    }

    public get password(): string {
      return this._password;
    }

    public set password(value: string) {
      if (value && value.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }
        this._password = value;
    }

    private firebaseConfig() {
        const firebaseConfig = {
            apiKey: "AIzaSyDzSHwAtTj36nO7DPCdtiWqrcVhJ34RLco",
            authDomain: "literrisinventum.firebaseapp.com",
            projectId: "literrisinventum",
            storageBucket: "literrisinventum.appspot.com",
            messagingSenderId: "863313920136",
            appId: "1:863313920136:web:5a35c51a3cd02bf4631f3d",
            measurementId: "G-8PP422JWJ9"
          };
          
        const app = initializeApp(firebaseConfig);
        return app
    }


    public getErrorWrongPassword(error: FirebaseError) {
      const errorMessages: Record<string, string> = {
        "auth/wrong-password":   "Senha Incorreta, tente novamente!",
        "auth/invalid-email":    "Email inválido, ou inexistente!",
        "auth/missing-password": "Coloque sua senha por favor",
        "auth/user-not-found": "Usuário não encontrado!",
        "auth/email-already-exists": "Este email já está em uso!"
      };
      return errorMessages[error.code] || error.message;
    }

    public async login() {
      const auth = getAuth(this.firebaseConfig());

      try {
        const userCredential = await signInWithEmailAndPassword(auth, this._email, this._password)
        const user = userCredential.user; 
        const idToken = await user.getIdToken(); 

        const response = await fetch('/login/adm', { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ idToken })
        });


        if (!response.ok) { throw new Error('Failed to login'); }

        alert("Login feito com sucesso!!!!😁😀"); 
        const url = response.url; 
        await useAuthStore().setAuthToken(); 
        // this.$router.push('/'); console.log(url);
        return url
      } catch (error) {
        return this.getErrorWrongPassword(error as FirebaseError)
      } 
    }

    public async logOut() {
        try {
            const response = await fetch('/sessionLogout', { method: 'POST' })

            if (!response.ok) { throw new Error('Failed to logOut'); }
          } catch (error) {
            console.log(error)
          } finally {
            await router.go(0)
            await router.push({ path: '/login' });
          }
    }
 
}

export default AuthService;