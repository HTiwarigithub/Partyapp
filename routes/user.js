const http = require('http');
exports.signup = (req, res) => {
    db.close();
    db.connect(conn, () => {
        console.log("kjbgfkashjbdfghkbdfv_first")
        var arr;
        var name = req.body.username;
        var phone = req.body.phone;
        var gender = req.body.gender;
        var dob = req.body.dob;
        var email = req.body.email;
        var password = req.body.password;
        if (req.file == undefined) {
            var profilepic = '';
        }
        else {
            var profilepic = req.file.originalname;
        }
        var otp = Math.floor(Math.random() * Math.pow(10, 4)).toString().padStart(4, "0");
        var deviceToken = req.body.deviceToken;
        console.log("kjbgfkashjbdfghkbdfv_Second")
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'Insert');
        request.input('Name', db.NVarChar(255), name);
        request.input('Mobile', db.NVarChar(255), phone);
        request.input('Gender', db.NVarChar(255), gender);
        request.input('DOB', db.NVarChar(255), dob);
        request.input('Email', db.NVarChar(255), email);
        request.input('profilePic', db.NVarChar(255), profilepic);
        request.input('Password', db.NVarChar(255), password);
        request.input('Otp', db.NVarChar(255), otp);
        request.input('deviceToken', db.NVarChar(255), deviceToken);
        request.execute('prcusers', function (err, result) {
            arr = new Array();
            if (err) {
                console.log("kjbgfkashjbdfghkbdfv_Error",err)
                arr = err.originalError.info.message.split(".");
                if (arr[0] == 'Violation of UNIQUE KEY constraint \'UC_Name\'') {
                    res.send({
                        "status": "0",
                        "message": "Name is already taken."
                    })
                }
                else if (arr[0] == 'Violation of UNIQUE KEY constraint \'UC_Mobile\'') {
                    res.send({
                        "status": "0",
                        "message": "Mobile no is already registered."
                    })
                }
            }
            else {
                console.log(result)
                if (result == null) {
                    res.send({
                        "status": "0",
                        "message": "Error in signup"
                    })
                }
                else {
                    var message = 'Your party app otp is : ' + otp;
                    var number = phone;
                    http.get('http://teleshoppe.co.in/serv/BulkPush/?user=tsb&pass=12345678&message=' + message + '&msisdn=' + number + '&sender=SVMTPL&type=text', (response) => {
                        let data = '';
                        response.on('data', (chunk) => {
                            data += chunk;
                        });
                        response.on('end', () => {
                            res.send({
                                "status": "1",
                                "message": "Otp For registration send to your Mobile" + otp
                            })
                        });

                    }).on("error", (err) => {
                        console.log("Error: " + err.message);
                    });
                    
                }
            }
        });
    });
};

exports.login = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var username = req.body.username;
        var password = req.body.password;
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'login');
        request.input('value', db.NVarChar(255), username);
        request.input('Password', db.NVarChar(255), password);
        request.execute('prcusers', function (err, result) {
            if (err) {
                res.send({
                    "status": "0",
                    "message": "Error Occured! ",
                    "data": {}
                })
            }
            else {
                if (result.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "Invalid login credentials",
                        "data": {}
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "User login successfully ",
                        "data": result.recordset[0]
                    })
                }
            }
        });
    });
};

module.exports.checkRegistration = (req, res) => {
    db.close();
    db.connect(conn, () => {
      var request = new db.Request();
      request.input('ActionType', db.NVarChar, 'registeredUser');
      request.input('value', db.NVarChar, req.body.value);
      request.execute('prcusers', (err, result) => {
        if (err) {
          res.send({
            "status": "1",
            "message": "error occured"
          })
        }
        else {
          console.log(result);
          if (result.recordset == undefined) {
            res.send({
              "status": "0",
              "message": "Mobile no is not registered"
            });
          }
          else {
            res.send({
              "status": "1",
              "message": "Mobile no is registered"
            });
          }
        }
      });
    });
  };

exports.forgetPassword = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var number = req.body.number;
        var password = req.body.password;
        var otp = Math.floor(Math.random() * Math.pow(10, 4)).toString().padStart(4, "0");
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'forgetPassword');
        request.input('Mobile', db.NVarChar, number);
        request.input('Password', db.NVarChar, password);
        request.input('Otp', db.NVarChar, otp);
        request.execute('prcusers', (error, result) => {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "error Occured"
                })
            }
            else {
                if (result.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Incorrect details",
                        "data": {}
                    })
                }
                else {
                    var message = 'Your party app otp is : ' + otp;
                    var num = number;
                    http.get('http://www.teleshoppe.com/serv/BulkPush/?user=tsb&pass=12345678&message=' + message + '&msisdn=' + num + '&sender=SVMTPL&type=text', (response) => {
                        let data = '';
                        response.on('data', (chunk) => {
                            data += chunk;
                        });
                        response.on('end', () => {
                            res.send({
                                "status": "1",
                                "message": "Otp For Password change send to your Mobile" + otp
                            })
                        });

                    }).on("error", (err) => {
                        console.log("Error: " + err.message);
                    });
                   
                }
            }
        });
    });
};


exports.otpAuth = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var type = req.body.type;
        var otp = req.body.otp;
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'OtpAuth');
        request.input('Otp', db.NVarChar, otp);
        request.execute('prcusers', (error, result) => {
            console.log(result)
            if (error) {
                res.send({
                    "status": "0",
                    "message": "error Occured",
                    "data": {}
                })
            }
            else {
                if (result.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "Otp Incorrect",
                        "data": {}
                    })
                }
                else {
                    if (type == 'register') {
                        res.send({
                            "status": "1",
                            "message": "User registered successfully",
                            "data": result.recordset[0]
                        })
                    }
                    else if (type == 'forget') {
                        res.send({
                            "status": "1",
                            "message": "User password change successfully",
                            "data": {}
                        })
                    }
                }
            }
        });
    });
};


exports.resendOtp = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var number = req.body.number;
        var otp = Math.floor(Math.random() * Math.pow(10, 4)).toString().padStart(4, "0");
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'resendOtp');
        request.input('Mobile', db.NVarChar, number);
        request.input('Otp', db.NVarChar, otp);
        request.execute('prcusers', (error, result) => {
            console.log(result);
            if (error) {
                res.send({
                    "status": "0",
                    "message": "error Occured"
                })
            }
            else {
                if (result.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Login error"
                    })
                }
                else {
                    var message = 'Your party app otp is : ' + otp;
                    var num = number;
                    http.get('http://www.teleshoppe.com/serv/BulkPush/?user=tsb&pass=12345678&message=' + message + '&msisdn=' + num + '&sender=SVMTPL&type=text', (response) => {
                        let data = '';
                        response.on('data', (chunk) => {
                            data += chunk;
                        });
                        response.on('end', () => {
                            res.send({
                                "status": "1",
                                "message": "New otp send to your Mobile" + otp
                            })
                        });

                    }).on("error", (err) => {
                        console.log("Error: " + err.message);
                    });
                   
                }
            }
        });
    });
};

exports.updateProfile = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var name = req.body.username;
        var phone = req.body.phone;
        var gender = req.body.gender;
        var dob = req.body.dob;
        var email = req.body.email;
        if (req.file == undefined) {
            var profilepic = 'NO';
        }
        else {
            var profilepic = req.file.originalname;
        }
        var Id = req.body.id;
        var deviceToken = req.body.deviceToken;
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'update');
        request.input('Name', db.NVarChar(255), name);
        request.input('Mobile', db.NVarChar(255), phone);
        request.input('Gender', db.NVarChar(255), gender);
        request.input('DOB', db.NVarChar(255), dob);
        request.input('Email', db.NVarChar(255), email);
        request.input('profilePic', db.NVarChar(255), profilepic);
        request.input('Id', db.NVarChar(255), Id);
        request.input('deviceToken', db.NVarChar(255), deviceToken);
        request.execute('prcusers', function (err, result) {
            arr = new Array();
            if (err) {
                arr = err.originalError.info.message.split(".");
                if (arr[0] == 'Violation of UNIQUE KEY constraint \'UC_Name\'') {
                    res.send({
                        "status": "0",
                        "message": "Name is already taken."
                    })
                }
                else if (arr[0] == 'Violation of UNIQUE KEY constraint \'UC_Mobile\'') {
                    res.send({
                        "status": "0",
                        "message": "Mobile no is already registered."
                    })
                }
            }
            else {
                console.log(result)
                if (result.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Error in updation",
                        "data": {}
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Your Profile updated successfully.",
                        "data": result.recordset[0]
                    })
                }
            }
        });
    });
};


exports.changePassword = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var Id = req.body.id;
        var oldpassword = req.body.oldpassword;
        var Password = req.body.password;
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'changePassword');
        request.input('Id', db.NVarChar(50), Id);
        request.input('oldpassword', db.NVarChar(50), oldpassword);
        request.input('Password', db.NVarChar(50), Password);
        request.execute('prcusers', function (err, result) {
            console.log(result);
            if (err) {
                res.send({
                    "status": "0",
                    "message": "Error Occured"
                })
            }
            else {
                console.log(result)
                if (result.rowsAffected == 1) {
                    res.send({
                        "status": "0",
                        "message": "Please Enter correct previous password "
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Your Password change successfully."
                    })
                }
            }
        });
    });
};



module.exports.deceituser = (req, res) => {
    db.close();
    db.connect(conn, () => {

        var project_name = req.body.project_name;
        var request = new db.Request();

        request.input('action', db.NVarChar, 'select');
        request.input('project_name', db.NVarChar, project_name);
        request.execute('prcAgain', function (err, results) {

            if (err) {
                res.send({
                    "status": "0",
                    "message": "oops some error ",
                    "data": {}
                })
            }

            else if (results == null) {
                res.send({
                    "status": "0",
                    "message": "cannot on/off the project",
                    "data": {}
                })
            }

            else {
                res.send({
                    'status': "1",
                    "message": "",
                    "data": results.recordset[0]


                })
            }

        });
    });
};


