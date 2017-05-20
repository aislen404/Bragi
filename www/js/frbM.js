/**
 * Created by Aislen404 on 20/5/17.
 * FireBase Manager
 * TODO: Reference for the storage MUST be configurable
 */

var frbm = {
    firebaseConfig: {
        apiKey: 'AIzaSyDCm4SzFeqV-u43itxCIqLEDXdCcgGv-Ec',
        authDomain: 'bragi-93b4c.firebaseapp.com',
        databaseURL: 'https://bragi-93b4c.firebaseio.com',
        projectId: 'bragi-93b4c',
        storageBucket: 'bragi-93b4c.appspot.com',
        messagingSenderId: '530505084751'
    },
    initFireBase: function (){
        var resp_provy = firebase.initializeApp(this.firebaseConfig);
        console.log('initFireBase : ' + resp_provy);
    },
    saveInFirebase: function(data) {
        var ref = firebase.storage().ref('model.json');
        ref.putString(JSON.stringify(app.model));
        console.log('dasdasdasdasdasdad '+JSON.stringify(data));
    }
};