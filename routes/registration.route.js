const express = require('express');
// const { send } = require('process');
// const app = express();
const registrationRoute = express.Router();

// Student model
let Registration = require('../model/registration');
let Property = require('../model/property');

// Add Registration
registrationRoute.route('/signup').post((req, res, next) => {
    Registration.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            let response  = {
                data: data,
                status: "success",
                statusCode: 200
            }
            res.status(200).send(response)
        }
    })
});

registrationRoute.route('/addProperty').post((req, res, next) => {
    Property.create(req.body, (error, data) => {
        if (error) {
            // return next(error)
            res.status(400).send("Error Occur");
        } else {
            let response  = {
                data: data,
                status: "success",
                statusCode: 200
            }
            res.status(200).send(response)
        }
    })
});

// Get all Registration
registrationRoute.route('/').get((req, res) => {
    Registration.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get single Registration
registrationRoute.route('/validateUser/:email').get((req, res) => {
    Registration.find({ username: req.params.email}, function (err, docs) {
        if (err) {
            return res.status(400).send('No Records Found');
        } else {
            res.status(200).send(docs._id);
        }
    });

    // console.log(req.params);
    // Registration.findById(req.params.email, (error, data) => {
    //     if (error) {
    //         return res.status(400).send('No Records Found');
    //     } else {
    //         res.status(200).send(data);
    //     }
    // })
})

// // Update student
// registrationRoute.route('/update-student/:id').put((req, res, next) => {
//     Registration.findByIdAndUpdate(req.params.id, {
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
// registrationRoute.route('/delete-student/:id').delete((req, res, next) => {
//     Registration.findByIdAndRemove(req.params.id, (error, data) => {
//         if (error) {
//             return next(error);
//         } else {
//             res.status(200).json({
//                 msg: data
//             })
//         }
//     })
// })

module.exports = registrationRoute;