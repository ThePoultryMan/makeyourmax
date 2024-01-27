import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC40EszMQfAvKd1kDfiaBDKcC67C4ufa-o",
  authDomain: "makeyourmax-4f3e6.firebaseapp.com",
  projectId: "makeyourmax-4f3e6",
  storageBucket: "makeyourmax-4f3e6.appspot.com",
  messagingSenderId: "957711326624",
  appId: "1:957711326624:web:4c9d7ce4d047abe2a2d8c5",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();
