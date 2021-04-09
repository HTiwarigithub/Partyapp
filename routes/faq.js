exports.addFaqQuesAns = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var Ques = req.body.ques;
        var Ans = req.body.ans;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Insert');
        request.input('Ques',db.NVarChar,Ques);
        request.input('Ans',db.NVarChar,Ans);
        request.execute('prcFaq',(error,result)=>{
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
                        "message": "Faq Ques ans not added"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Faq Ques ans added successfully"
                    })
                }
            }
        });
    });
};

exports.getFaqQuesAns = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Select');
        request.execute('prcFaq',(error,result)=>{
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
                        "message": "no Faq in List",
                        "data":[]
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Faq List",
                        "data":result.recordset
                    })
                }
            }
        });
    });
};



exports.updateFaqQuesAns = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var Id = req.body.faqid;
        var Ques = req.body.ques;
        var Ans = req.body.ans;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Delete');
        request.input('Id',db.NVarChar,Id);
        request.input('Ques',db.NVarChar,Ques);
        request.input('Ans',db.NVarChar,Ans);
        request.execute('prcFaq',(error,result)=>{
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
                        "message": "Faq Ques ans not update"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Faq Ques ans updated successfully"
                    })
                }
            }
        });
    });
};



exports.deleteFaqQuesAns = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var Id = req.body.privacyid;
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Delete');
        request.input('Id',db.NVarChar,Id);
        request.execute('prcFaq',(error,result)=>{
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
                        "message": "Error in deleting FAQ"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "FAQ deleted successfully"
                    })
                }
            }
        });
    });
};