var app={

    model : {
        'registros': [{
            'id': 1,
            'BARCODE_DATA': 9788416255443,
            'BARCODE_TYPE': 'EAN_13',
            'BARCODE_INFO': 'ISBN',
            'TIMESTAP': '2014-12-22 20:25:39'

        },{
            'id': 3,
            'BARCODE_DATA': 9788467909883,
            'BARCODE_TYPE': 'EAN_13',
            'BARCODE_INFO': 'ISBN',
            'TIMESTAP': '2014-12-22 21:07:22'
        },{
            'id': 4,
            'BARCODE_DATA': 9788416051748,
            'BARCODE_TYPE': 'EAN_13',
            'BARCODE_INFO': 'ISBN',
            'TIMESTAP': '2014-12-22 21:08:32'
        },{
            'id': 5,
            'BARCODE_DATA': 9788489966482,
            'BARCODE_TYPE': 'EAN_13',
            'BARCODE_INFO': 'ISBN',
            'TIMESTAP': '2014-12-22 21:09:50'
        },{
            'id': 6,
            'BARCODE_DATA': 9788498858358,
            'BARCODE_TYPE': 'EAN_13',
            'BARCODE_INFO': 'ISBN',
            'TIMESTAP': '2014-12-22 21:11:43'
        },{
            'id': 7,
            'BARCODE_DATA': 9788467425390,
            'BARCODE_TYPE': 'EAN_13',
            'BARCODE_INFO': 'ISBN',
            'TIMESTAP': '2014-12-23 19:37:47'
        }
        ]},
    provi : {'registros': []},

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
        fsm.writeToFile('data.json', app.model);
        app.reportingArea('writed out !!'); //TODO: that MUST be a 'this' or not?

    },

    readingFile: function () {
        "use strict";
        document.body.className = 'read';
        fsm.readFromFile('data.json', function (data) {
            app.reportingArea(JSON.stringify(data));
            app.model.registros.push('');
            app.model.registros.push(data);
        });

    },

    scanning: function () {
        "use strict";
        document.body.className = 'scan';
        bragi.activeBarScan(function(data){
            app.reportingArea(JSON.stringify(data));
            app.reportingRecords();
            app.provi.registros.push({
                'cancelled':data.cancelled,
                'text':data.text,
                'format':data.format
            });
        });

    },

    writeRecord: function () {
        "use strict";
        document.body.className = 'register';
        var register = {
            'cancelled':app.provi.registros.cancelled,
            'text':app.provi.registros.text,
            'format':app.provi.registros.format
        };
        app.provi.registros.push('');
        app.model.registros.push(app.provi);
        fsm.writeToFile('data.json',app.model);
    },

    discardRecord: function () {
        "use strict";
        app.reportingArea('');
        app.reportingRecords();
        app.provi.registros.push('');
    }
};

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function (){
        "use strict";
        app.init();
    }, false);
}
