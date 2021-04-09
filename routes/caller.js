exports.addCallerDetail = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var Name = req.body.name;
        var Email = req.body.email;
        var Mobile = req.body.mobile;
        var Address = req.body.address;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Insert');
        request.input('Name',db.NVarChar,Name);
        request.input('Email',db.NVarChar,Email);
        request.input('Mobile',db.NVarChar,Mobile);
        request.input('Address',db.NVarChar,Address);
        request.execute('prccallerdetail',(error,result)=>{
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
                        "message": "Caller detail not registered"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Caller detail registered"
                    })
                }
            }
        });
    });
};

exports.getCallerDetail = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Select');
        request.execute('prccallerdetail',(error,result)=>{
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
                        "message": "no caller details",
                        "data":{}
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Caller detail ",
                        "data":result.recordset[0]
                    })
                }
            }
        });
    });
};