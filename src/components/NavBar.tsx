"use client";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeoNtSgo9GRaX5Raa92TKPzQWJdC37Ap8",
  authDomain: "boilerplate-7545b.firebaseapp.com",
  projectId: "boilerplate-7545b",
  storageBucket: "boilerplate-7545b.appspot.com",
  messagingSenderId: "974143551034",
  appId: "1:974143551034:web:c4575fafbfef1ab4132703",
  measurementId: "G-CYEHQ2KJV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const usersRef = collection(db, "Users");
const photosRef = collection(db, "Photos");
const storageRef = getStorage(app);

function uploadImage(event: React.FormEvent<HTMLInputElement>, userId: string | undefined) {
    const photo_uuid = self.crypto.randomUUID();
    const file = event.target.files[0];

    uploadBytes(ref(storageRef, ('images/' + photo_uuid)), file)
    setDoc(doc(photosRef, photo_uuid), {
        "reference": `/boilerplate-7545b.appspot.com/images/${photo_uuid}`,
        "uploadTime": new Date(),
        "userId": userId
    })
    updateDoc(doc(usersRef, userId), {
        "Posts": arrayUnion(photo_uuid)
    })
    console.log("Uploaded image")
}

export default function NavBar({userId}: {userId: string | undefined}) {

    return (
        <div className="bg-black">
        <div className="h-[5vh] grid grid-cols-3 gap-4 px-4 py-4 overflow-hidden">
            <a href="/feed" className="text-white">
                Feed
            </a>
            <form method="POST" target="/api/upload">
            <label htmlFor="photoupload" className="text-white">Upload
                <input id="photoupload" type="file" className="invisible" accept=".jpg,.png,.heic" onChange={e => uploadImage(e, userId)}>
                </input>
            </label>
            </form>
            <a href="/profile" className="text-white">
                Profile
            </a>
        </div>
        </div>
    );
    }

