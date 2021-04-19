"use strict";
var paytm_config = require('../paytm/paytm_config').paytm_config;
var paytm_checksum = require('../paytm/checksum');

module.exports.paytmCheckSum = (req,res) => {
    var paramarray = {};
    paramarray['MID'] = req.body.mid; //Provided by Paytm
    paramarray['ORDER_ID'] = req.body.order_id; //unique OrderId for every request
    paramarray['CUST_ID'] = req.body.cust_id;  // unique customer identifier 
    paramarray['INDUSTRY_TYPE_ID'] ='Retail'; //Provided by Paytm
    paramarray['CHANNEL_ID'] = 'WAP'; //Provided by Paytm
    paramarray['TXN_AMOUNT'] = req.body.txn_amount; // transaction amount
    paramarray['WEBSITE'] = 'DEFAULT'; //Provided by Paytm
    paramarray['CALLBACK_URL'] = req.body.callback_url;//Provided by Paytm
    paramarray['mode'] = req.body.mode;

    console.log(paramarray);

        paytm_checksum.genchecksum(paramarray, paytm_config.MERCHANT_KEY, function (err, checksum) {
            console.log(checksum);
           res.send({
               "Status":"1",
                "Message":"Checksum generated!", 
                "data": checksum
            })
        });
};

function htmlEscape(str) {
  return String(str)
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
}

