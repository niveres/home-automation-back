import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";
import { exec } from 'child_process';

const firebaseConfig={
    apiKey: "AIzaSyA8cDFFmfrRQcI8MEJRBrwsBAwEbCKCmhs",
    authDomain: "home-automation-f0b6a.firebaseapp.com",
    databaseURL: "https://home-automation-f0b6a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "home-automation-f0b6a",
    storageBucket: "home-automation-f0b6a.appspot.com",
    messagingSenderId: "163508284538",
    appId: "1:163508284538:web:df5a6c3be8706a0cc85fc3"
};

initializeApp(firebaseConfig);
const db = getDatabase();
const shell = ref(db, 'triggers/test/shell');

onValue(shell, (snapshot) => {
    const data = snapshot.val();
    console.log('Nouvelle demande : ', data);
    if(data){
        console.log('execution');
        exec('sh testAutomation.sh',(error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });
        console.log('fin');
    } else {
        console.log('Non prise en compte');
    }
    console.log('');
});
