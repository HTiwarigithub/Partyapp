exports.addCategory = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var C_Name = req.body.name;
        var C_Pic =  req.file.originalname;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Insert');
        request.input('C_Name',db.NVarChar,C_Name);
        request.input('C_Pic',db.NVarChar,C_Pic);
        request.execute('prcservice',(error,result)=>{
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
                        "message": "Error in adding category"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Category added successfully"
                    })
                }
            }
        });
    });
};

exports.getCategory = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Select')
        request.execute('prcservice',(error,result)=>{
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
                        "message": "No category in List",
                        "data":[]
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Category List",
                        "data":result.recordset
                    })
                }
            }
        });

    });
};

exports.editCategory = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var Id = req.body.catid;
        var C_Name = req.body.name;
        if(req.file==undefined){
            var C_Pic = 'NO';
        }
        else{
            
        var C_Pic =  req.file.originalname;
        }
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Update');
        request.input('Id',db.NVarChar,Id);
        request.input('C_Name',db.NVarChar,C_Name);
        request.input('C_Pic',db.NVarChar,C_Pic);
        request.execute('prcservice',(error,result)=>{
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
                        "message": "Error in updating category"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Category updated successfully"
                    })
                }
            }
        });
    });
};


exports.deleteCategory = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var Id = req.body.catid;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Delete');
        request.input('Id',db.NVarChar,Id);
        request.execute('prcservice',(error,result)=>{
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
                        "message": "Error in deleting category"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Category deleted successfully"
                    })
                }
            }
        });
    });
};