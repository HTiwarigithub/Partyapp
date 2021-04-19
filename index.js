var express = require('express')
var fcm = require('fcm-notification');
var FCM = new fcm('./fcmkey/fcmActivationKey.json');
var http = require('http')
var path = require('path')
var app = express();
var bodyParser=require("body-parser");
const Paytm = require('paytm-pg-node-sdk');
var user = require('./routes/user');
var contact = require('./routes/contact');
var category = require('./routes/category');
var product = require('./routes/product');
var cart = require('./routes/cart');
var order = require('./routes/order');
var caller = require('./routes/caller');
var faq = require('./routes/faq');
var tc = require('./routes/tc');
var privacy = require('./routes/privacy');
var checksum = require('./routes/checksum');
var paytm = require('./routes/paytm');
var multer = require('multer'); 
const DIR = './uploads';
var crypto = require('crypto');



let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname );
  }
});

let upload = multer({ storage: storage });

var mssql    = require('mssql');
var connection = {
    server: 'sql5041.site4now.net',
    user: 'DB_A3CE37_locapi_admin',
    password: 'LOC@1234',
    database : 'DB_A3CE37_locapi',
    options: {
        enableArithAbort: false
      }
};


mssql.connect(connection,function(err,result) {
if(err)
console.log(err);
else
console.log("result");
});
global.Fcm = FCM;
global.db = mssql;
global.conn = connection;


app.set('hostname', process.env.Host ||'0.0.0.0');
app.set('port', process.env.PORT || 3500);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/resources',express.static(__dirname + '/uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
});

http.createServer(app).listen(app.get('port'),app.get('hostname'), function(){
  console.log('Express server listening on host '+app.get('hostname')+' and port ' + app.get('port'));
});

var router = express.Router();
app.get('/', function (req, res) {
    res.send('this is the main Page');
});

app.use('/api/party', router);
router.get('/', function (req, res) {
    res.send('This is the second page');
});

router.post('/User/signUp',upload.single('file'), user.signup);
router.post('/User/login',user.login);
router.post('/User/forgetPassword',user.forgetPassword);
router.post('/User/otpAuth',user.otpAuth);
router.post('/User/resendOtp',user.resendOtp);
router.post('/User/checkRegistration',user.checkRegistration);
router.post('/User/updateProfile',upload.single('file'), user.updateProfile);
router.post('/User/changePassword',user.changePassword);
router.post('/User/deceituser',user.deceituser);
router.post('/Contact/addMessage',contact.addMessage);
router.get('/Contact/getMessage',contact.getMessage);
router.post('/Category/addCategory',upload.single('file'),category.addCategory);
router.get('/Category/getCategory',category.getCategory);
router.post('/Category/editCategory',category.editCategory);
router.post('/Category/deleteCategory',category.deleteCategory);
router.post('/Product/addproduct',upload.single('file'),product.addproduct);    
router.post('/Product/getProductList',product.getProductList);
// router.post('/Product/getProduct',product.getProduct);/
router.post('/Product/editProduct',product.editProduct);
router.post('/Product/deleteProduct',product.deleteProduct);
router.post('/Cart/addPackageCount',cart.addPackageCount);
router.post('/Cart/getCartList',cart.getCart);
router.post('/Cart/getCartCount',cart.getCartCount);
router.post('/Cart/getProductCount',cart.getProductCount);
router.post('/Cart/removeProductCart',cart.removeProductCart);
router.post('/Order/addOrderDetail',order.addOrderDetail);
router.get('/Order/getOrderList',order.getOrderList);

//
router.post('/Order/Order_history',order.Order_history);
router.get('/Order/Product_details',order.Product_details);
router.post('/Order/Make_order',order.Make_order);
router.post('/Order/Save_ptmres',order.Save_ptmres);
//
router.post('/Caller/addCallerDetail',caller.addCallerDetail);
router.get('/Caller/getCallerDetail',caller.getCallerDetail);
router.post('/Faq/addFaqQuesAns',faq.addFaqQuesAns);
router.get('/Faq/getFaqQuesAns',faq.getFaqQuesAns);
router.post('/Faq/updateFaqQuesAns',faq.updateFaqQuesAns);
router.post('/Faq/deleteFaqQuesAns',faq.deleteFaqQuesAns);
router.post('/TC/addTC',tc.addTC);
router.get('/TC/getTC',tc.getTC);
router.post('/TC/updateTC',tc.updateTC);
router.post('/TC/deleteTC',tc.deleteTC);
router.post('/Privacy/addPrivacy',privacy.addPrivacy);
router.get('/Privacy/getPrivacy',privacy.getPrivacy);
router.post('/Privacy/updatePrivacy',privacy.updatePrivacy);
router.post('/Privacy/deletePrivacy',privacy.deletePrivacy);
//
router.post('/paytm/paytmCheckSum',paytm.paytmCheckSum);
//
router.get('/Privacy/privacyPolicy',(req,res)=>{
  res.render('pages/privacy');
})


router.post('/Payment/getHash',(req,res)=>{
    var key = req.key
   //var merchantId = req.merchantId;
    var txnid = req.txnid
    var amount = req.amount
   // var surl = req.surl
   // var furl = req.furl
    var productInfo = req.productInfo
    var email = req.email
    var firstName = req.firstName
   //var phone = req.phone
    var salt = 'a12b4'

    
    

    var cryp = crypto.createHash('sha512');
		var text = key+'|'+txnid+'|'+amount+'|'+productInfo+'|'+firstName+'|'+email+'|||||||||||'+salt;
		cryp.update(text);
    var hash = cryp.digest('hex');
    res.send({
      "status": "1",
      "message": "Hash",
      "hash": hash
  })
})









/*function intervalFunc() {
}

setInterval(intervalFunc, 10000);*/