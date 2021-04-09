"use strict";

var crypto = require('crypto');



exports.generate_checksum = (req, res) => {
    /* import checksum generation utility */


/* initialize JSON String */ 
let data = {
    mid : "DLjjoP50683529074696",
    orderId : "121"
}

var paytmChecksum = PaytmChecksum.generateSignature(JSON.stringify(data), "dM0xTZCzkiKtJF4p");
paytmChecksum.then(function(result){
	console.log("generateSignature Returns: " + result);
}).catch(function(error){
	console.log(error);
});
};

