exports.addMessage = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var Name = req.body.name;
        var Email = req.body.email;
        var Message = req.body.message;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Insert');
        request.input('Name',db.NVarChar,Name);
        request.input('Email',db.NVarChar,Email);
        request.input('Message',db.NVarChar,Message);
        request.execute('prccontact',(error,result)=>{
            if (error) {
                res.send({
                    "status": "0",
                    "message": "error occured"
                })
            }
            else {
                if (result == null) {
                    res.send({
                        "status": "0",
                        "message": "Error in enquery"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Enquired message saved successfully"
                    })
                }
            }
        });
    });
};

exports.getMessage = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Select');
        request.execute('prccontact',(error,result)=>{
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error Occured! ",
                    "data":[]
                })
            }
            else {
                if (result.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "no message list",
                        "data":[]
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Message List ",
                        "data":result.recordset
                    })
                }
            }
        });
    });
};