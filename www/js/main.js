var app={
    blank_model : [],
    model : [],
    provi : [],

    init: function(){
        "use strict";
        this.initButtons();
        this.initFastClick();
    },

    initFastClick: function () {
        FastClick.attach(document.body);
    },

    initButtons: function () {
        var buttonWriteFile = document.querySelector('#write-file');
        var buttonReadFile = document.querySelector('#read-file');
        var buttonScan = document.querySelector('#scan');
        var buttonWriteRecord = document.querySelector('#write-record');
        var buttonDiscardRecord = document.querySelector('#discard-record');

        buttonWriteFile.addEventListener('click',this.writingFile,false);
        buttonReadFile.addEventListener('click',this.readingFile,false);
        buttonScan.addEventListener('click',this.scanning,false);
        buttonWriteRecord.addEventListener('click',this.writeRecord,false);
        buttonDiscardRecord.addEventListener('click',this.discardRecord,false);
    },

    reportingArea: function (data) {
        var zona = document.getElementById('zona-info');
        zona.innerHTML = data;
    },

    reportingRecords: function(){
        "use strict";
        var zona = document.getElementById('zona-record');
        if(zona.className == 'noActive'){
            zona.className = 'active';
        }else{
            zona.className = 'noActive'
        }
    },

    writingFile: function(){
        "use strict";
        document.body.className = 'write';
        fsm.writeToFile('data.json', app.blank_model);
        app.reportingArea('writed out !!');
    },

    readingFile: function () {
        "use strict";
        document.body.className = 'read';
        fsm.readFromFile('data.json', function (data) {
            app.model=data;
            app.reportingArea(JSON.stringify(data));
        });
    },

    scanning: function () {
        "use strict";
        document.body.className = 'scan';
        bragi.activeBarScan(function(data){
            app.reportingRecords();
            app.provi= data ;
            app.reportingArea(JSON.stringify(data));

            function findCODE(CODE) {
                return CODE.text === data.text;
            }
            console.log('HE MAN DICE : '+data.text);
            console.log(JSON.stringify(app.model.find(findCODE)));
        });

    },

    writeRecord: function () {
        "use strict";
        document.body.className = 'register';
        app.reportingRecords();
        app.model.push(app.provi);
        app.provi=[];
        fsm.writeToFile('data.json',app.model);
    },

    discardRecord: function () {
        "use strict";
        app.reportingArea('');
        app.reportingRecords();
        app.provi=app.blank_model;
    }
};

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function (){
        "use strict";
        app.init();
    }, false);
}
