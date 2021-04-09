exports.addproduct = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var C_Id = req.body.catId;
        var P_Name = req.body.name;
        var P_Pic = req.file.originalname;
        var P_Desc = req.body.desc;
        var P_price = req.body.price;
        var request= new db.Request();
        request.input('ActionType',db.NVarChar,'Insert');
        request.input('C_Id',db.NVarChar,C_Id);
        request.input('P_Name',db.NVarChar,P_Name);
        request.input('P_Pic',db.NVarChar,P_Pic);
        request.input('P_Desc',db.NVarChar,P_Desc);
        request.input('P_price',db.NVarChar,P_price);
        request.execute('prcproduct',(error,result)=>{
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error occured"
                })
            }
            else {
                console.log(result)
                if (result.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Error in adding product"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Product is added successfully"
                    })
                }
            }
        });
        
    });
};


exports.getProduct = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var C_Id = req.body.catId;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Select');
        request.input('C_Id',db.NVarChar,C_Id);
        request.execute('prcproduct',(error,result)=>{
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error occured",
                    "data":[]
                })
            }
            else {
                if (result.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "No product list",
                        "data":[]
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Product List",
                        "data":result.recordset
                    })
                }
            }
        });
    });
};

exports.getProductList = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var brandid = req.body.brandid;
        var userid = req.body.userid;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Select');
        request.input('brandid',db.NVarChar,brandid);
        request.input('userid',db.NVarChar,userid);
        request.execute('prcproductmaster',(error,result)=>{
            if (error) {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error occured",
                    "data":[]
                })
            }
            else {
                if (result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B'] == 0) {
                    res.send({
                        "status": "0",
                        "message": "No product in list",
                        "data":[]
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Product List",
                        "data":Object.values(JSON.parse(result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
                    })
                }
            }
        });
    });
};


exports.editProduct = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var Id = req.body.pid;
        var C_Id = req.body.catId;
        var P_Name = req.body.name;
        if(req.file==undefined){
            var P_Pic = 'NO';
        }
        else{
            var P_Pic =  req.file.originalname;
        }
        var P_Desc = req.body.desc;
        var P_price = req.body.price;
        var request= new db.Request();
        request.input('ActionType',db.NVarChar,'Update');
        request.input('Id',db.NVarChar,Id);
        request.input('C_Id',db.NVarChar,C_Id);
        request.input('P_Name',db.NVarChar,P_Name);
        request.input('P_Pic',db.NVarChar,P_Pic);
        request.input('P_Desc',db.NVarChar,P_Desc);
        request.input('P_price',db.NVarChar,P_price);
        request.execute('prcproduct',(error,result)=>{
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error occured"
                })
            }
            else {
                console.log(result)
                if (result.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Error in updating product"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Product is update successfully"
                    })
                }
            }
        });
        
    });
};



exports.deleteProduct = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var Id = req.body.pid;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Delete');
        request.input('Id',db.NVarChar,Id);
        request.execute('prcproduct',(error,result)=>{
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error occured"
                })
            }
            else {
                console.log(result)
                if (result.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Error in deleting product"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Product deleted successfully"
                    })
                }
            }
        });
    });
};