const { json } = require("body-parser");

exports.addOrderDetail = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var name = req.body.name;
        var orderamount = req.body.orderamount;
        var paymode = req.body.paymode;
        var email = req.body.email;
        var phonenumber = req.body.phonenumber;
        var address = req.body.address;
        var date = req.body.date;
        var time = req.body.time;
        var uid = req.body.uid;
        var cartId = req.body.cartId;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Insert');
        request.input('name',db.NVarChar,name);  
        request.input('orderamount',db.NVarChar,orderamount);  
        request.input('paymode',db.NVarChar,paymode);  
        request.input('email',db.NVarChar,email);  
        request.input('phonenumber',db.NVarChar,phonenumber);  
        request.input('address',db.NVarChar,address);  
        request.input('date',db.NVarChar,date);  
        request.input('time',db.NVarChar,time);  
        request.input('uid',db.NVarChar,uid);
        request.execute('prctblOrder',(error,result)=>{
            
            if (error) {
                console.log(error);
                res.send({
                    "status": "0",
                    "message": "Error Occured"
                })
            }
            else {
                console.log(result);
                if (result.rowsAffected[0] == 0) {
                    res.send({
                        "status": "0",
                        "message": "Error in placing Order"
                    })
                }
                else {
                    oid = result.recordset[0].oid
                    var arr = cartId.split(",");
                    console.log(arr);
                    for(var i = 0;i<arr.length;i++)
                    {
                        console.log(arr[i]);
                        var request1 = new db.Request();
                        request1.input('ActionType',db.NVarChar,'insertdetail');
                        request1.input('uid',db.NVarChar, uid);
                        request1.input('orderid',db.NVarChar,oid);
                        request1.input('cartId',db.NVarChar,arr[i]);
                        request1.execute('prctblOrder',(error,results)=>{
                            console.log(results);
                        });
                    }
                    res.send({
                        "status": "1",
                        "message": "order Placed successfuly"
                    })
                }
            }
        });  
    });
}; 

exports.getOrderList = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'getOrderList');
        request.execute('prctblOrder',(error,result)=>{
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error Occured",
                    "data":[]
                })
            }
            else {
                if (result.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "No Order in list",
                        "data":[]
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "order List",
                        "data":result.recordset
                    })
                }
            }
        });

    });
};
//

exports.Order_history = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Select');
        request.input('userid',db.NVarChar,req.body.userid);
        request.execute('order_history',(error,result)=>{
            if (error) {
                console.log("heloooo",error)
                res.send({
                    "status": "0",
                    "message": "Error Occured",
                    "data":[]
                })
            }
            else {
                if (result.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "No Order in list",
                        "data":[]
                    })
                }
                else {
                    
                    res.send({
                        "status": "1",
                        "message": "order List",
                        "data":result.recordset
                    })
                }
            }
        });

    });
};


exports.Product_details = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Product_details');
        request.execute('order_history',(error,result)=>{
            if (error) {
                console.log("heloooo",error)
                res.send({
                    "status": "0",
                    "message": "Error Occured",
                    "data":[]
                })
            }
            else {
                if (result.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "No Order in list",
                        "data":[]
                    })
                }
                else {
                    console.log("hiiiiiii",result.recordset)
                    res.send({
                        "status": "1",
                        "message": "order List",
                        "data":result.recordset
                    })
                }
            }
        });

    });
};

exports.Make_order = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        var alpha = JSON.parse(req.body.order)
        console.log("convert",alpha)
        var qty=""
        var prod_id =""
        var total = ""
        for (var i = 0; i<alpha.length ;i++ ) {
            if(alpha.length-1 == i){
                 qty= qty+ alpha[i].qty
                 prod_id = prod_id + alpha[i].prod_id
                 total = total+ alpha[i].total
            }else{
                qty= qty+ alpha[i].qty+","
                prod_id = prod_id + alpha[i].prod_id +","
                total = total+ alpha[i].total +","
            }
        }

        request.input('ActionType',db.NVarChar,'Insert');
        request.input('Name',db.NVarChar,req.body.Name);
        request.input('phone',db.NVarChar,req.body.phone);
        request.input('pincode',db.NVarChar,req.body.pincode);
        request.input('location',db.NVarChar,req.body.location);
        request.input('city',db.NVarChar,req.body.city);
        request.input('landmark',db.NVarChar,req.body.landmark);
        request.input('address',db.NVarChar,req.body.address);
        request.input('date',db.NVarChar,req.body.date);
        request.input('time',db.NVarChar,req.body.time);
        request.input('qty',db.NVarChar,qty);
        request.input('prod_id',db.NVarChar,prod_id);
        request.input('total',db.NVarChar,total);
        request.input('userid',db.NVarChar,req.body.userid);
        request.input('person',db.NVarChar,req.body.person);
        request.execute('order_history',(error,result)=>{
            if (error) {
                console.log("heloooo",error)
                res.send({
                    "status": "0",
                    "message": "Error Occured",
                    "data":[]
                })
            }
            else {
                console.log("fgjdkijg",result.recordset)
                if (result.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Order not successful",
                        "data":{}
                    })
                }
                else {
                    console.log("hiiiiiii",result.recordset)
                    res.send({
                        "status": "1",
                        "message": "Order successful",
                        "data":result
                    })
                }
            }
        });

    });
};


exports.Save_ptmres = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Save_ptmres');
        request.input('orderid_paytm',db.NVarChar,req.body.orderid_paytm);
        request.input('Mode',db.NVarChar,req.body.Mode);
        request.input('txn_id',db.NVarChar,req.body.txn_id);
        request.input('userid',db.NVarChar,req.body.userid);
        request.execute('order_history',(error,result)=>{
            if (error) {
                console.log("heloooo",error)
                res.send({
                    "status": "0",
                    "message": "Error Occured",
                    "data":[]
                })
            }
            else {
                if (result.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "Responce not Updated",
                        "data":[]
                    })
                }
                else {
                    console.log("hiiiiiii",result.recordset)
                    res.send({
                        "status": "1",
                        "message": "Responce Updated",
                        "data":result.recordset
                    })
                }
            }
        });

    });
};