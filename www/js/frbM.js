/**
 * Created by Aislen404 on 20/5/17.
 * FireBase Manager
 * TODO: Reference for the storage MUST be configurable
 */

var frbm = {
    saveInFirebase : function () {

        var config = {
            apiKey: "AIzaSyDCm4SzFeqV-u43itxCIqLEDXdCcgGv-Ec",
            authDomain: "bragi-93b4c.firebaseapp.com",
            databaseURL: "https://bragi-93b4c.firebaseio.com",
            projectId: "bragi-93b4c",
            storageBucket: "bragi-93b4c.appspot.com",
            messagingSenderId: "530505084751"
        };

        firebase.initializeApp(config);

        var myFile = 'file:///var/mobile/Containers/Data/Application/42159035-E108-45BA-823E-AF3E6F65832F/Library/NoCloud/data.json';
        var storageRef =  firebase.storage().ref('file/');

        storageRef.put(myFile);


    }
};