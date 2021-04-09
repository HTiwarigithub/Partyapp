exports.addPrivacy = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var Heading = req.body.heading;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Insert');
        request.input('Heading',db.NVarChar,Heading);
        request.execute('prcPrivacy',(error,result)=>{
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error Occured! "
                })
            }
            else {
                if (result.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Privacy details is  not added"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Privacy detail added successfully"
                    })
                }
            }
        });
    });
};

exports.getPrivacy = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Select');
        request.execute('prcPrivacy',(error,result)=>{
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error Occured! ",
                    "data":{}
                })
            }
            else {
                if (result.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "no Privacy details",
                        "data":{}
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Privacy Detail",
                        "data":result.recordset[0]
                    })
                }
            }
        });
    });
};

exports.updatePrivacy = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var Id = req.body.privacyid;
        var Heading = req.body.heading;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Update');
        request.input('Id',db.NVarChar,Id);
        request.input('Heading',db.NVarChar,Heading);
        request.execute('prcPrivacy',(error,result)=>{
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error Occured! "
                })
            }
            else {
                if (result.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Privacy details is  not update"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Privacy detail updated successfully"
                    })
                }
            }
        });
    });
};


exports.deletePrivacy = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var Id = req.body.privacyid;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Delete');
        request.input('Id',db.NVarChar,Id);
        request.execute('prcPrivacy',(error,result)=>{
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
                        "message": "Error in deleting privacy"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "privacy deleted successfully"
                    })
                }
            }
        });
    });
};