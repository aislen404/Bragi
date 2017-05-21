/**
 * Created by Aislen404 on 20/5/17.
 * FireBase Manager
 * TODO: Reference for the storage MUST be configurable
 */

var frbm = {
    firebaseConfig: {
        apiKey: '',
        authDomain: '',
        databaseURL: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: ''
    },
    initFireBase: function (){
        var resp_provy = firebase.initializeApp(this.firebaseConfig);
        console.log('initFireBase : ' + resp_provy);
    },
    saveInFirebase: function(data) {
        var ref = firebase.storage().ref('model.json');
        ref.putString(JSON.stringify(data));
        console.log('Firebase Sending:\n '+JSON.stringify(data));
    }
};