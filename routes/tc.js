exports.addTC = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var Heading = req.body.heading;
        var Tc1 = req.body.tc1;
        var Tc2 = req.body.tc2;
        var Tc3 = req.body.tc3;
        var Tc4 = req.body.tc4;
        var Tc5 = req.body.tc5;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Insert');
        request.input('Heading',db.NVarChar,Heading);
        request.input('Tc1',db.NVarChar,Tc1);
        request.input('Tc2',db.NVarChar,Tc2);
        request.input('Tc3',db.NVarChar,Tc3);
        request.input('Tc4',db.NVarChar,Tc4);
        request.input('Tc5',db.NVarChar,Tc5);
        request.execute('prcTandC',(error,result)=>{
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
                        "message": "TC are not added"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "TC added successfully"
                    })
                }
            }
        });
    });
};


exports.getTC = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Select');
        request.execute('prcTandC',(error,result)=>{
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
                        "message": "no TC in List",
                        "data":{}
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "TC List",
                        "data":result.recordset[0]
                    })
                }
            }
        });
    });
};

exports.updateTC = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var Id = req.body.tcid;
        var Heading = req.body.heading;
        var Tc1 = req.body.tc1;
        var Tc2 = req.body.tc2;
        var Tc3 = req.body.tc3;
        var Tc4 = req.body.tc4;
        var Tc5 = req.body.tc5;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Update');
        request.input('Id',db.NVarChar,Id);
        request.input('Heading',db.NVarChar,Heading);
        request.input('Tc1',db.NVarChar,Tc1);
        request.input('Tc2',db.NVarChar,Tc2);
        request.input('Tc3',db.NVarChar,Tc3);
        request.input('Tc4',db.NVarChar,Tc4);
        request.input('Tc5',db.NVarChar,Tc5);
        request.execute('prcTandC',(error,result)=>{
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
                        "message": "TC are not updated"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "TC updated successfully"
                    })
                }
            }
        });
    });
};


exports.deleteTC = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var Id = req.body.privacyid;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Delete');
        request.input('Id',db.NVarChar,Id);
        request.execute('prcTandC',(error,result)=>{
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
                        "message": "Error in deleting TC"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "TC deleted successfully"
                    })
                }
            }
        });
    });
};