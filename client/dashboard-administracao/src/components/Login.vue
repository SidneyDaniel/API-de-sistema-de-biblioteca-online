<template>
    <div>
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="Password">
      <button @click="login">Login</button>
    </div>
  </template>
  
<script lang="ts">
import { useAuthStore } from '@/stores/auth';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebase from 'firebase/compat/app';


const firebaseConfig = {
  apiKey: "AIzaSyDzSHwAtTj36nO7DPCdtiWqrcVhJ34RLco",
  authDomain: "literrisinventum.firebaseapp.com",
  projectId: "literrisinventum",
  storageBucket: "literrisinventum.appspot.com",
  messagingSenderId: "863313920136",
  appId: "1:863313920136:web:5a35c51a3cd02bf4631f3d",
  measurementId: "G-8PP422JWJ9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);


export default {
  name:'login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      const auth = getAuth(app);

      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          user.getIdToken().then(idToken => {
            fetch('/login/adm', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ idToken })

            })
              .then(response => {
                const url = response.url
                alert("Login feito com sucesso!!!!😁😀")
                useAuthStore().setAuthToken();
                // window.location.href = url;
                this.$router.replace('home')
                console.log(url);
              })
              .catch(error => console.error(error));
          });
        })
        .catch((error) => {
          alert(getErrorWrongPassword(error))
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }
};

interface fireBaseError extends Error {
    code: string
}
  
function getErrorWrongPassword(error: fireBaseError) {
  const errorMessages: Record<string, string> = {
    "auth/wrong-password":   "Senha Incorreta, tente novamente!",
    "auth/invalid-email":    "Email inválido, ou inexistente!",
    "auth/missing-password": "Coloque sua senha por favor",
    "auth/user-not-found": "Usuário não encontrado!",
    "auth/email-already-exists": "Este email já está em uso!"
  };
  return errorMessages[error.code] || error.message;
}
</script>