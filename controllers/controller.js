// const validator = require('express-validator');
var express = require('express');
var router = express.Router();
var Email = require('../models/model');

/* GET home page. */
exports.index = function(req, res, next) {
  res.render('index'/*, { title: 'Express' }*/);
};

exports.redirect = function(req, res, next) {
  res.redirect('/'/*, { title: 'Express' }*/);
};

/* POST home page. */
// exports.post = [
//
//   // Validate that the email field is not empty.
//   validator.body('email', 'Email required').isLength({ min: 1 }).trim(),
//
//   // Sanitize (escape) the email field.
//   validator.sanitizeBody('email').escape(),
//
//   // Process request after validation and sanitization.
//   (req, res, next) => {
//
//     // Extract the validation errors from a request.
//     const errors = validator.validationResult(req);
//
//     if (!errors.isEmpty()) {
//       // There are errors. Render the form again with sanitized values/error messages.
//       res.render('index', { email: email, errors: errors.array()});
//       return;
//     }
//     else {
//       // Data from form is valid.
//
//       // Create a email object with escaped and trimmed data.
//       var email = new Email(
//         { email: req.body.email }
//       );
//
//       // Check if Email with same email already exists.
//       Email.findOne({ 'email': req.body.email })
//         .exec( function(err, found_email) {
//            if (err) { return next(err); }
//
//            if (found_email) {
//              console.log("email already submitted!");
//            }
//            else {
//
//              email.save(function (err) {
//                if (err) { return next(err); }
//                // Email saved. Redirect to genre detail page.
//                res.redirect('/');
//               console.log("data saved");
//              });
//
//            }
//
//          });
//     }
//   }
// ];

/* POST home page. */
// exports.apipost = function(req, res, next) {
//
//   // Validate that the email field is not empty.
//   validator.body('email', 'Email required').isLength({ min: 1 }).trim();
//
//   // Sanitize (escape) the email field.
//   validator.sanitizeBody('email').escape();
//
//   // Process request after validation and sanitization.
//   // (req, res, next) => {
//
//   // Extract the validation errors from a request.
//   const errors = validator.validationResult(req);
//
//   if (!errors.isEmpty()) {
//     return "error!";
//     console.log("error!");
//     // There are errors.
//   }
//   else {
//     // Data from form is valid.
//
//     // Create a email object with escaped and trimmed data.
//     var email = new Email(
//       { email: req.body.email }
//     );
//
//     // Check if Email with same email already exists.
//     Email.findOne({ 'email': req.body.email })
//       .exec( function(err, found_email) {
//          if (err) { return next(err); }
//
//          if (found_email) {
//            console.log("email already submitted!");
//            return "email already submitted!";
//          }
//          else {
//
//            email.save(function (err) {
//              if (err) { return next(err); }
//             console.log("data saved!");
//             return "data saved!"
//            });
//
//          }
//
//        });
//   }
//
// };

// Create and Save a new Email
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Email can not be empty"
        });
    }

    // Create a Email
    const email = new Email({
        email: req.body.email
    });
//
// // Check if Email with same email already exists.
// Email.findOne({ 'email': req.body.email })
//   .exec( function(err, found_email) {
//      if (err) { return next(err); }
//
//      if (found_email) {
//        res.status(500).send({
//            message: "email already submitted!"
//        });
//        // console.log("email already submitted!");
//      }
//      else {
//      //
//      //   email.save(function (err) {
//      //     if (err) { return next(err); }
//      //     // Email saved. Redirect to genre detail page.
//      //     res.redirect('/');
//      //    console.log("data saved");
//      //   });
//      //
//
//        // Save Email in the database
//        email.save()
//      }
//
//    });
//
    Email.count({email: req.body.email}, function (err, count){
        if(count>0){
            //document exists });
            res.status(500).send({
              message: "Error: Email already submitted"
            });
        } else {
          email.save()
          .then(data => {
              // res.send(data);
              // return data
              res.status(200).send({
                message: "Subscription success!"
              });
          }).catch(err => {
              res.status(500).send({
                  message: err.message || "Some error occurred while creating the Email."
              });
              // return "Some error occurred while creating the Email."
          });
        }
    });
    // Save Email in the database
    // email.save()
    // .then(data => {
    //     res.send(data);
    //     // return data
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while creating the Email."
    //     });
    //     // return "Some error occurred while creating the Email."
    // });
};

// Retrieve and return all emails from the database.
exports.findAll = (req, res) => {
    Email.find()
    .then(emails => {
        res.send(emails);
        // return emails
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving emails."
        });
        // return "Some error occurred while retrieving emails."
    });
};

// Find a single email with a emailId
exports.findOne = (req, res) => {
    Email.findById(req.params.emailId)
    .then(email => {
        if(!email) {
            return res.status(404).send({
                message: "Email not found with id " + req.params.emailId
            });
            // return "Email not found with id " + req.params.emailId
        }
        res.send(email);
        // return email
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Email not found with id " + req.params.emailId
            });
            // return "Email not found with id " + req.params.emailId
        }
        return res.status(500).send({
            message: "Error retrieving email with id " + req.params.emailId
        });
        // return "Error retrieving email with id " + req.params.emailId
    });
};

// Update a email identified by the emailId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Email can not be empty"
        });
        // return "Email can not be empty"
    }

    // Find email and update it with the request body
    Email.findByIdAndUpdate(req.params.emailId, {
        email: req.body.email
    }, {new: true})
    .then(email => {
        if(!email) {
            return res.status(404).send({
                message: "Email not found with id " + req.params.emailId
            });
            // return "Email not found with id " + req.params.emailId
        }
        res.send(email);
        return email
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Email not found with id " + req.params.emailId
            });
            // return "Email not found with id " + req.params.emailId
        }
        return res.status(500).send({
            message: "Error updating email with id " + req.params.emailId
        });
        // return "Error updating email with id " + req.params.emailId
    });
};

// Delete a email with the specified emailId in the request
exports.delete = (req, res) => {
    Email.findByIdAndRemove(req.params.emailId)
    .then(email => {
        if(!email) {
            return res.status(404).send({
                message: "Email not found with id " + req.params.emailId
            });
            // return "Email not found with id " + req.params.emailId
        }
        res.send({message: "Email deleted successfully!"});
        // return "Email deleted successfully!"
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Email not found with id " + req.params.emailId
            });
            // return "Email not found with id " + req.params.emailId
        }
        return res.status(500).send({
            message: "Could not delete email with id " + req.params.emailId
        });
        // return "Could not delete email with id " + req.params.emailId
    });
};
