import router from "@/router"
import { useAuthStore } from '@/stores/auth';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from "firebase/app";
import { ref } from "vue";

class AuthService {
    private _email: string
    private _password: string

    constructor(params: {email: string, password: string}){
        this._email = params.email
        this._password = params.password
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
        

        if (!response.ok) { 
          const responseBody = await response.json()
          throw new Error(responseBody.message); 
        }

        await useAuthStore().setAuthToken(); 
        return response
      } catch (error) {
        const errorMessage = error instanceof FirebaseError ? this.getErrorWrongPassword(error) : error

        return errorMessage
      } 
    }

    public async logOut() {
        try {
            const response = await fetch('/logout', { method: 'POST' })

            if (!response.ok) { throw new Error('Failed to logOut'); }

            await router.go(0)
            await router.push({ path: '/login' });

            return response
          } catch (error) {
            return error 
          } 
    }
 
  public currentUser(): Promise<{ name: string, email: string }> {
    const auth = getAuth(this.firebaseConfig());

    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve({
            name: user.displayName ?? '',
            email: user.email ?? ''
          });
        } else {
          resolve({ name: '', email: '' });
        }
      });
    });
  }
}

export default AuthService;