/**
 * Created by Aislen404 on 20/5/17.
 * FireBase Manager
 * TODO: Reference for the storage MUST be configurable
 */

var frbm = {
    config : {

    },
    initFireBase: function (){
        var res_frb = firebase.initializeApp(frbm.config);

        console.log('config : ' + this.config + '\n');
        console.log('initFireBase : ' + res_frb + '\n');
    },
    saveInFirebase: function(data) {

        // Points to the root reference
        var storageRef = firebase.storage().ref();
        // Points to 'images'
        var recordsRef = storageRef.child('records');
        // File or Blob named mountains.jpg
        var file = data;

        // Create the file metadata
        var metadata = {
            timeCreated: 'text/json'
        };

        // Upload file and metadata to the object
        var uploadTask = storageRef.child('records').put(file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done \n');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused \n');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running \n');
                        break;
                }
            },
            function(error) {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        console.log('User NOT have permission to access the object \n');
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        console.log('User canceled the upload \n');
                        break;
                    case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                        console.log('Unknown error occurred, inspect error.serverResponse \n');
                    break;
                }
            },
            function() {
                // Upload completed successfully, now we can get the download URL
                console.log('Upload completed successfully, now we can get the download URL \n'+ uploadTask.snapshot.downloadURL);
            });

    }
};