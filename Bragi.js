var app = {
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
	firebaseConfig: {
		apiKey: 'AIzaSyDCm4SzFeqV-u43itxCIqLEDXdCcgGv-Ec',
		authDomain: 'bragi-93b4c.firebaseapp.com',
		databaseURL: 'https://bragi-93b4c.firebaseio.com',
		projectId: 'bragi-93b4c',
		storageBucket: 'bragi-93b4c.appspot.com',
		messagingSenderId: '530505084751'
	},
	scanConfig: {
		preferFrontCamera : true, // iOS and Android
		showFlipCameraButton : true, // iOS and Android
		showTorchButton : true, // iOS and Android
		torchOn: true, // Android, launch with the torch switched on (if available)
		prompt : 'Place a barcode inside the scan area', // Android
		resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
		formats : 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
		orientation : 'landscape', // Android only (portrait|landscape), default unset so it rotates with the device
		disableAnimations : true, // iOS
		disableSuccessBeep: false // iOS
	},
	URL_A : {'http://catalogo.bne.es/uhtbin/cgisirsi/x/0/0/57/5/3?searchdata1='},
	URL_REQUEST : {URL_A + ISBN + URL_A_Tail} ,
	
	init : function (){
		this.initFastClick();
		this.initFireBase();
		this.TEST_ListarRegistros();
	},
	initFastClick: function() {
		FastClick.attach(document.body);
	},
	initFireBase(){
		firebase.initializeApp(this.firebaseConfig);	
	},
	activeBarScan(){
	   cordova.plugins.barcodeScanner.scan(
			function (result) {
			  alert('We got a barcode\n' +
					'Result: ' + result.text + '\n' +
					'Format: ' + result.format + '\n' +
					'Cancelled: ' + result.cancelled);
			},
			function (error) {
			  alert('Scanning failed: ' + error);
			},this.scanConfig
		);	
	},
	TEST_ListarRegistros:function(){
		var reg = this.model.registros;
		var isbn = '';
		for (var i in reg) {
			alert ('BARCODE_DATA ' + reg[i].BARCODE_DATA + '\n'+
			'BARCODE_TYPE ' + reg[i].BARCODE_TYPE + '\n'+
			'BARCODE_INFO ' + reg[i].BARCODE_INFO + '\n'+
			'TIMESTAP ' + new Date());
		}
	},
	grabarDatos: function() {
		window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, this.gotFS, this.fail);
	},

	gotFS: function(fileSystem) {
		fileSystem.getFile("files/"+"model.json", {create: true, exclusive: false}, app.gotFileEntry, app.fail);
	},
	gotFileEntry: function(fileEntry) {
		fileEntry.createWriter(app.gotFileWriter, app.fail);
	},
	gotFileWriter: function(writer) {
		writer.onwriteend = function(evt) {
			console.log("datos grabados en externalApplicationStorageDirectory");
			if(app.CAPABILITY_Wifi()) {
				app.salvarFirebase();
			}
		};
		writer.write(JSON.stringify(app.model));
	},
	salvarFirebase: function() {
		var ref = firebase.storage().ref('model.json');
		ref.putString(JSON.stringify(app.model));
	},
	CAPABILITY_Wifi: function() {
		return navigator.connection.type==='wifi';
	},
};

if ('addEventListener' in document) {
  document.addEventListener('deviceready', function() {
    app.init();
  }, false);
};
