/**
 * Created by Aislen404 on 20/5/17.
 * Main Application
 */

var app={
    blank_model : [],
    provi : [],

    init: function(){
        "use strict";

        console.log('init');

        this.readingFile();
        this.initButtons();
        this.initFastClick();
    },

    initFastClick: function () {
        "use strict";

        console.log('initFastClick');

        FastClick.attach(document.body);
    },

    initButtons: function () {
        "use strict";

        console.log('initButtons');

        var buttonWriteFile = document.querySelector('#write-file');
        var buttonReadFile = document.querySelector('#read-file');
        var buttonFireBase = document.querySelector('#fire-base');
        var buttonScan = document.querySelector('#scan');
        var buttonWriteRecord = document.querySelector('#write-record');
        var buttonDiscardRecord = document.querySelector('#discard-record');

        buttonWriteFile.addEventListener('click',this.writingFile,false);
        buttonReadFile.addEventListener('click',this.readingFile,false);
        buttonFireBase.addEventListener('click',this.fireBaseSend,false);
        buttonScan.addEventListener('click',this.scanning,false);
        buttonWriteRecord.addEventListener('click',this.writeRecord,false);
        buttonDiscardRecord.addEventListener('click',this.discardRecord,false);
    },

    reportingArea: function (data) {
        "use strict";

        console.log('reportingArea');

        var zona = document.getElementById('info-area');

        zona.innerHTML = data;
    },

    buttonsArea: function(){
        "use strict";

        console.log('buttonsArea');

        var zona = document.getElementById('zona-buttons');

        if(zona.className == 'noActive'){
            zona.className = 'active';
        }else{
            zona.className = 'noActive'
        }
    },

    reportingRecords: function(){
        "use strict";

        console.log('reportingRecords');

        var zona = document.getElementById('zona-record');

        if(zona.className == 'noActive'){
            zona.className = 'active';
        }else{
            zona.className = 'noActive'
        }
    },

    writingFile: function(){    //TODO: to Delete
        "use strict";

        console.log('writingFile');

        fsm.writeToFile(app.blank_model);
        app.reportingArea('writed out !!');
        app.model=app.blank_model;
        app.paintRecords();
    },

    readingFile: function () {  //TODO: to Delete
        "use strict";

        console.log('readingFile');

        fsm.readFromFile( function (data) {
            app.model=data;
            app.reportingArea('Data Loaded !!');
            app.paintRecords();
        });
    },

    fireBaseSend: function () {
        "use strict";

        console.log('fireBaseSend');
    },

    scanning: function () {
        "use strict";

        console.log('scanning');

        app.buttonsArea();
        bragi.activeBarScan(function(data){
            app.provi= data ;

            if(app.model.find(findCODE)){
                app.reportingArea('referencia duplicada');
                app.reportingRecords();
            }else{
                app.reportingRecords();
                app.reportingArea(JSON.stringify(data));
            }

            function findCODE(CODE) {
                return CODE.text === data.text;
            }

        });
    },

    writeRecord: function () {
        "use strict";

        console.log('writeRecord');

        app.reportingRecords();
        app.buttonsArea();
        app.model.push(app.provi);
        app.provi=[];
        fsm.writeToFile(app.model);
        app.paintRecords();
    },

    discardRecord: function () {
        "use strict";

        console.log('discardRecord');

        app.reportingArea('');
        app.buttonsArea();
        app.reportingRecords();
        app.provi=app.blank_model;
    },

    paintRecords: function(){
        "use strict";

        console.log('paintRecords');

        var reg = app.model;
        var theHTML = [];
        var zona = document.querySelector('#records-area');

        zona.innerHTML = '';
        for (var i in reg) {
            theHTML.push('<div id="record-'+i+'" class="record"><span class="text">'+reg[i].text+'</span><span class="format">'+reg[i].format+'</span></div>');
        }
        zona.innerHTML = theHTML.join("  ");
    }

};

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function (){
        "use strict";
        app.init();
    }, false);
}
