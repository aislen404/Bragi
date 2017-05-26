/**
 * Created by Aislen404 on 20/5/17.
 * File System Manager
 * TODO: Delete Records
 */

var fsm = {
    where : cordova.file.dataDirectory,
    what : 'data.json',
    writeToFile: function(data) {
        "use strict";
        var fileName = this.what;
        data = JSON.stringify(data, null, '\t');
        console.log('writeToFile : \n'+data);
        window.resolveLocalFileSystemURL(this.where, function (directoryEntry) {
            directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.onwriteend = function (e) {
                        // TODO: for real-world usage, you might consider passing a success callback
                        console.log('Write of file "' + fileName + '"" completed.');
                    };
                    fileWriter.onerror = function (e) {
                        // TODO: hook this up with our global error handler, or pass in an error callback
                        console.log('Write failed: ' + e.toString());
                    };
                    var blob = new Blob([data], { type: 'text/plain' });
                    fileWriter.write(blob);
                }, fsm.errorHandler.bind(null, fileName));
            }, fsm.errorHandler.bind(null, fileName));
        }, fsm.errorHandler.bind(null, fileName));
    },
    appendToFile: function(fileName, data){
        "use strict";
        console.log(data);
        data = JSON.stringify(data, null, '\t');
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
            directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.onwriteend = function (e) {
                        // for real-world usage, you might consider passing a success callback
                        console.log('Append to file "' + fileName + '"" completed.');
                    };
                    fileWriter.onerror = function (e) {
                        // you could hook this up with our global error handler, or pass in an error callback
                        console.log('Append failed: ' + e.toString());
                    };
                    var blob = new Blob([data], { type: 'text/plain' });
                    fileWriter.seek(fileWriter.length); //TODO: this could be managed with a third argumment.
                    fileWriter.write(blob);
                }, fsm.errorHandler.bind(null, fileName));
            }, fsm.errorHandler.bind(null, fileName));
        }, fsm.errorHandler.bind(null, fileName));
    },
    readFromFile: function(callback) {
        "use strict";
        var fileName = this.what;
        var pathToFile = this.where + fileName;
        console.log('hola --> ' + cordova.file.dataDirectory);
        window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    console.log('readFromFile : \n'+JSON.parse(this.result));
                    callback(JSON.parse(this.result));
                };
                reader.readAsText(file);
            }, fsm.errorHandler.bind(null, fileName));
        }, fsm.errorHandler.bind(null, fileName));
    },
    errorHandler: function (fileName, e) {
        var msg = '';
        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'Storage quota exceeded';
                break;
            case FileError.NOT_FOUND_ERR:
                msg = 'File not found';
                break;
            case FileError.SECURITY_ERR:
                msg = 'Security error';
                break;
            case FileError.INVALID_MODIFICATION_ERR:
                msg = 'Invalid modification';
                break;
            case FileError.INVALID_STATE_ERR:
                msg = 'Invalid state';
                break;
            default:
                msg = 'Unknown error';
                break;
        };
        console.log('Error (' + fileName + '): ' + msg);
    }
};