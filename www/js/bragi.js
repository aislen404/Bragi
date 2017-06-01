/**
 * Created by Aislen404 on 20/5/17.
 * Eloquently Services:
 * 		+ Scanning Bar & QR Codes
 * 		TODO: Retrieving Information
 */

var bragi = {
	scanConfig: {
		preferFrontCamera : false, // iOS and Android
		showFlipCameraButton : true, // iOS and Android
		showTorchButton : true, // iOS and Android
		torchOn: true, // Android, launch with the torch switched on (if available)
		prompt : 'Place a barcode inside the scan area', // Android
		resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
		formats : 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
		orientation : 'landscape', // Android only (portrait|landscape), default unset so it rotates with the device
		disableAnimations : true, // iOS
		disableSuccessBeep: true // iOS
	},
	activeBarScan: function (callback){
	   cordova.plugins.barcodeScanner.scan(
			function (result) {
			  callback (result);
			},
			function (error) {
			  callback (error);
			},this.scanConfig
		);	
	},
	CAPABILITY_Wifi: function() {
		return navigator.connection.type==='wifi';
	}
};

