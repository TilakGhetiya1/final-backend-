const express = require('express');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRoute = express.Router();

let User = require('../model/user');
let Property = require('../model/property');

userRoute.route('/signup').post((req, res, next) => {
    // const salt = bcrypt.genSalt(10);
    // console.log("salt :" + salt);
    // bcrypt.hash(req.body.password, 10).then(hash => {
    // console.log("hash :" + hash);
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    });
    console.log("user :" + user);
    User.find({ email: req.body.email }, 'email').then(email => {
        console.log("email " + email);
        if (email.length > 0) {
            return res.status(200).json({
                message: "Email Already Exist"
            })
        } else {
            User.find({ username: req.body.username }, 'username').then(user1 => {
                if (user1.length > 0) {
                    return res.status(200).json({
                        message: "User Already Exist"
                    })
                }
            });
        }

        // user.password = bcrypt.hash(user.password, salt);
        console.log("user 2 : " + user);
        User.create(user).then(result => {
            console.log(result);
            if (!result) {
                return res.status(500).json({
                    message: "Error Creating User"
                })
            }
            res.status(201).json({
                message: "User created!",
                statusCode: 201,
                result: result
            });
        })
    })
        .catch(err => {
            console.log("Error Occur");
            res.status(500).json({
                error: err
            });
        });;
})

// User.create(req.body, (error, data) => {
//     if (error) {
//         return next(error)
//     } else {
//         let response  = {
//             data: data,
//             status: "success",
//             statusCode: 200
//         }
//         res.status(200).send(response)
//     }
// })
// });

// userRoute.post("/login", (req, res, next) => {
//     let fetchedUser;

//     User.find({ email: req.body.email }).then(user => {
//         console.log("user 1: " + user);
//         if (!user) {
//             return res.status(200).json({
//                 message: "Auth failed no such user"
//             })
//         }

//         // User.find({ password: req.body.password }, 'password').then(pwd => {
//         //     console.log()
//         //     if (!pwd) {
//         //         return res.status(200).json({
//         //             message: "Auth failed no such user"
//         //         })
//         //     }
//         // });
//         console.log("user" + user);
//         fetchedUser = user;

//         const token = jwt.sign(
//             { email: fetchedUser.email, userId: fetchedUser._id },
//             // "keytool-importkeystore-srckeystore-TodayApp-jks-destkeystore-TodayApp-p12-deststoretype-PKCS12",
//             "secret_this_should_be_longer",
//             { expiresIn: "1h" }
//         );
//         console.log("token" + token);
//         res.status(200).json({
//             token: token,
//             expiresIn: 3600,
//             user: user
//         });

//         // console.log("plaintext pwd" + req.body.password);
//         // bcrypt.compare(req.body.password, user.password, function (err, result) {
//         //     console.log("result" + result);
//         //     console.log("err" + err);
//         //     if (!result) {
//         //         return res.status(200).json({
//         //             message: "Auth failed inccorect password"
//         //         })
//         //     }
//         //     // result == true
//         // });
//         // return bcrypt.compare(req.body.password, user.password);
//     }).then(result => {
//         console.log("result : "  + result);
//     })
//         .catch(e => {
//             console.log(e)
//         })
// })

userRoute.post("/login", (req, res, next) => {
    let fetchedUser;

    User.find({ email: req.body.email, password: req.body.password }).then(user => {
        console.log("User : " + user);
        if (!user) {
            return res.status(401).json({
                message: "Auth failed no such user"
            })
        }
        fetchedUser = user;
        const token = jwt.sign(
            { email: fetchedUser.email, userId: fetchedUser._id },
            "secret_this_should_be_longer",
            { expiresIn: "1h" }
        );
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            user: user
        });
        console.log("fetchedUser : " + fetchedUser);
        //   return bcrypt.compare(req.body.password, user.password);
    }).
        // .then(result => {
        //     if (!result) {
        //         return res.status(401).json({
        //             message: "Auth failed inccorect password"
        //         })
        //     }

        // })
        catch(e => {

            console.log(e)

        })
})

userRoute.route('/addProperty').post((req, res, next) => {
    req.postdate = new Date();
    let finalObj = req.body;
    // User.find({_id: req.body.userunkid}, "username").then(user => {
    //     console.log("user :" + user);
    //     if(user) {
    //         req.body.username = user.username;
    //     }
    // });

    Property.create(req.body, (error, data) => {
        if (error) {
            // return next(error)
            res.status(400).send("Error Occur");
        } else {
            let response = {
                data: data,
                status: "success",
                statusCode: 200
            }
            res.status(200).send(response)
        }
    })
});

userRoute.route('/getCategorywiseCount').get((req, res, next) => {
    Property.find({ type: { $in: ["House", "Apartment", "Condo", "Townhome", "Villa", "Duplex", "Warehouse"] } }, function (err, docs) {
        if (err) {
            res.status(400).send("Error Occur");
        } else {
            let generateCategoryCnt = {
                house: 0,
                apartment: 0,
                condo: 0,
                townhome: 0,
                villa: 0,
                duplex: 0,
                warehouse: 0
            };

            docs.map((data) => {
                console.log(data);
                if (data.type == "House") {
                    generateCategoryCnt.house++;
                } else if (data.type == "Apartment") {
                    generateCategoryCnt.apartment++;
                } else if (data.type == "Condo") {
                    generateCategoryCnt.condo++;
                } else if (data.type == "Townhome") {
                    generateCategoryCnt.townhome++;
                } else if (data.type == "Villa") {
                    generateCategoryCnt.villa++;
                } else if (data.type == "Duplex") {
                    generateCategoryCnt.duplex++;
                } else if (data.type == "Warehouse") {
                    generateCategoryCnt.warehouse++;
                }
            });
            let response = {
                data: generateCategoryCnt,
                status: "success",
                statusCode: 200
            }
            res.status(200).send(response)
        }
    }).catch(exception => console.log("Exception :" + exception));
});

userRoute.route('/getListing').get((req, res, next) => {
    Property.find({}, function (err, docs) {
        if (err) {
            res.status(400).send("Error Occur");
        } else {
            // docs.username = '';
            // docs.map((data) => {
            //     // console.log(data);
            //     Property.find({_id: data.userunkid}).then(user => {
            //         console.log("user :" + user);
            //         docs.username = user.username;
            //     });
            // });

            let response = {
                data: docs,
                status: "success",
                statusCode: 200
            }
            res.status(200).send(response)
        }
    }).catch(exception => console.log("Exception :" + exception));
});

// Get all User
userRoute.route('/').get((req, res) => {
    User.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get single User
userRoute.route('/validateUser/:email').get((req, res) => {
    User.find({ username: req.params.email }, function (err, docs) {
        if (err) {
            return res.status(400).send('No Records Found');
        } else {
            res.status(200).send(docs._id);
        }
    });

    // console.log(req.params);
    // User.findById(req.params.email, (error, data) => {
    //     if (error) {
    //         return res.status(400).send('No Records Found');
    //     } else {
    //         res.status(200).send(data);
    //     }
    // })
})

// // Update student
// userRoute.route('/update-student/:id').put((req, res, next) => {
//     User.findByIdAndUpdate(req.params.id, {
//         $set: req.body
//     }, (error, data) => {
//         if (error) {
//             return next(error);
//             console.log(error)
//         } else {
//             res.json(data)
//             console.log('Student successfully updated!')
//         }
//     })
// })

// // Delete student
// userRoute.route('/delete-student/:id').delete((req, res, next) => {
//     User.findByIdAndRemove(req.params.id, (error, data) => {
//         if (error) {
//             return next(error);
//         } else {
//             res.status(200).json({
//                 msg: data
//             })
//         }
//     })
// })

module.exports = userRoute;