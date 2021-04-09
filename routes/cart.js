module.exports.addPackageCount = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var productid = req.body.productid;
        var unitid = req.body.unitid;
        var userid = req.body.userid;
        var quantity = req.body.quantity;
        var amount = req.body.amount;
        if (userid == "") {
            res.send({
                "status": "0",
                "message": "Please Login First"
            })
        }
        else {
            var request = new db.Request();
            request.input('ActionType', db.NVarChar(50), 'getCount');
            request.input('productid', db.NVarChar(255), productid);
            request.input('unitid', db.NVarChar(255), unitid);
            request.input('userid', db.NVarChar(255), userid);
            request.execute('prcPartyCart', function (error, results) {
                if (error) {
                    console.log(error);
                    res.send({
                        "status": "0",
                        "message": "Error Ocurred"
                    })

                }
                else {
                    db.close();
                    db.connect(conn, () => {
                        console.log(results.recordsets)

                        var request1 = new db.Request();
                        if (results.recordsets[0].length == 0) {
                            console.log('insert')
                            request1.input('ActionType', db.NVarChar(50), 'Insert');
                            request1.input('productid', db.NVarChar(255), productid);
                            request1.input('unitid', db.NVarChar(255), unitid);
                            request1.input('userid', db.NVarChar(255), userid);
                            request1.input('quantity', db.NVarChar(255), quantity);
                            request1.input('amount', db.NVarChar(255), amount);
                            request1.execute('prcPartyCart', function (error, results) {
                                if (error) {
                                    res.send({
                                        "status": "0",
                                        "message": "Error Ocurred"
                                    })

                                }
                                if (results == null) {
                                    res.send({
                                        "status": "0",
                                        "message": "Product count not inserted"
                                    })
                                }
                                else {
                                    res.send({
                                        "status": "1",
                                        "message": "Package count added Successfully"
                                    })
                                }
                            });
                        }
                        else {
                            console.log('update')
                            request1.input('ActionType', db.NVarChar(50), 'Update');
                            request1.input('productid', db.NVarChar(255), productid);
                            request1.input('unitid', db.NVarChar(255), unitid);
                            request1.input('userid', db.NVarChar(255), userid);
                            request1.input('quantity', db.NVarChar(255), quantity);
                            request1.input('amount', db.NVarChar(255), amount);
                            request1.execute('prcPartyCart', function (error, data) {
                                if (error) {
                                    res.send({
                                        "status": "0",
                                        "message": "Error Ocurred"
                                    })

                                }
                                if (results == null) {
                                    res.send({
                                        "status": "0",
                                        "message": "Package count not updated"
                                    })
                                }
                                else {
                                    console.log("data", data)
                                    res.send({
                                        "status": "1",
                                        "message": "Package count updated Successfully"
                                    })
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

module.exports.getCart = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var userid = req.body.userid;
        if (userid == "") {
            res.send({
                "status": "0",
                "message": "Please Login First"
            })
        }
        else {
            var request = new db.Request();
            request.input('ActionType', db.NVarChar(50), 'getCart');
            request.input('userid', db.NVarChar(255), userid);
            request.execute('prcPartyCart', function (error, results) {
                if (error) {
                    console.log(error);
                    res.send({
                        "status": "0",
                        "message": "Error Ocurred",
                        "data": []
                    })

                }
                else {
                    if (results.recordsets[0][0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"] == '') {
                        res.send({
                            "status": "1",
                            "message": "Cart is blank",
                            "data": []
                        })
                    } else {
                        res.send({
                            "status": "1",
                            "message": "All Packages counts of the Product",
                            "data": JSON.parse(results.recordsets[0][0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"])
                        })
                    }

                }
            });
        }
    });
};

module.exports.getCartCount = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var userid = req.body.userid;
        if (userid == "") {
            res.send({
                "status": "0",
                "message": "Please Login First"
            })
        }
        else {
            var request = new db.Request();
            request.input('ActionType', db.NVarChar(100), 'getCartCount');
            request.input('userid', db.NVarChar(255), userid);
            request.execute('prcPartyCart', function (error, results) {
                if (error) {
                    res.send({
                        "status": "0",
                        "message": " error occured"
                    })
                }
                else {
                    if (results.recordset == 0) {
                        res.send({
                            "status": "0",
                            "message": " no Product in Cart !"
                        })
                    }
                    else {
                        res.send({
                            "status": "1",
                            "message": "Product in Cart ",
                            "data": Object.values(results.recordset[0])[0]
                        })
                    }
                }
            });
        }
    });
};

module.exports.getProductCount = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var userid = req.body.userid;
        var productid = req.body.productid;
        if (userid == "") {
            res.send({
                "status": "0",
                "message": "Please Login First"
            })
        }
        else {
            var request = new db.Request();
            request.input('ActionType', db.NVarChar(100), 'getProductCount');
            request1.input('productid', db.NVarChar(255), productid);
            request.input('userid', db.NVarChar(255), userid);
            request.execute('prcPartyCart', function (error, results) {
                if (error) {
                    res.send({
                        "status": "0",
                        "message": " error occured"
                    })
                }
                else {
                    if (results.recordset == 0) {
                        res.send({
                            "status": "0",
                            "message": " no Product in Cart !"
                        })
                    }
                    else {
                        res.send({
                            "status": "1",
                            "message": "Product count",
                            "data": Object.values(results.recordset[0])[0]+""
                        })
                    }
                }
            });
        }
    });
};


module.exports.removeProductCart = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var ID = req.body.ID;
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'RemoveProduct');
        request.input('ID', db.NVarChar, ID);
        request.execute('prcPartyCart', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "oops error"
                })
            }
            else if (results == null) {
                res.send({
                    "status": "0",
                    "message": " product not removed from cart"
                })
            }
            else {
                res.send({
                    "status": "1",
                    "message": " product removed from cart"

                })
            }
        });
    });
};