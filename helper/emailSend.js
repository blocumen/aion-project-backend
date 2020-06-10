const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setSubstitutionWrappers("{{", "}}");

const fs = require("fs"),
  path = require("path");

module.exports = {
  sendForgotPassword(userdetails, cb) {
    console.log("user detaillllllllllssssssssssssss");
    console.log(userdetails);
    let url =
      process.env.BASE_URL + "/forgotpassword/reset/" + userdetails.forgetKey;
    let dataToBeSent = {};
    dataToBeSent.username = userdetails.fullName;
    dataToBeSent.resetUrl = url;
    const filePath = path.join(
      __dirname,
      "/mail-templates/forgotPassword.html"
    );
    fs.readFile(filePath, { encoding: "utf-8" }, function(err, data) {
      if (!err) {
        console.log("received data: " + data);
        Object.keys(dataToBeSent).forEach(key => {
          data = data.split("{{ " + key + " }}").join(dataToBeSent[key]);
        });

        const mailOptions = {
          from: "support@mondayready.com", // sender address
          to: userdetails.userEmail, // list of receivers Details[0].email
          subject: "Recover Password", // Subject line
          html: data // plain text body
        };

        sgMail.send(mailOptions, function(err, info) {
          console.log(info);
          if (err) {
            console.log(err);
          } else {
            console.log(info);
            cb(1);
          }
        });
      } else {
        console.log(err);
      }
    });
  },
  sendVerifyToAdmin(userdetails, cb) {
    var bdy = "";
    bdy += "<p>Hello Nayan</p><br>";
    bdy +=
      "<p>User with mail id" +
      userdetails.userEmail +
      " hase signed up </p><br>";
    bdy += "<p> username is " + userdetails.fullName + "</p><br>";

    bdy += "<br><p>Thank You!</p>";
    const mailOptions = {
      from: "support@modayready.com", // sender address
      to: "mittal.nayan@sugoilabs.com", // list of receivers Details[0].email
      subject: "User Details", // Subject line
      html: bdy // plain text body
    };
    sgMail.send(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info, "Adminnnnnnn");
        cb(1);
      }
    });
  },

  sendMailToSugoiLabsEmployeeCreated(information, cb) {
    var bdy = "";
    bdy += "<p>Hello Nayan</p><br>";
    bdy +=
      "<p>Employee with mail id" +
      information.employee.email +
      " is created by " +
      information.addedBy.firstName +
      " in company " +
      information.company.fullName +
      "</p><br>";
    bdy += "<br><p>Thank You!</p>";
    const mailOptions = {
      from: "support@mondayready.com", // sender address
      to: "mittal.nayan@sugoilabs.com", // list of receivers Details[0].email
      subject: "User Details", // Subject line
      html: bdy // plain text body
    };
    sgMail.send(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info, "Adminnnnnnn");
        cb(1);
      }
    });
  },
  sendMailToSugoiLabsReviewMade(information, cb) {
    var bdy = "";
    bdy += "<p>Hello Nayan</p><br>";
    bdy +=
      "<p>Review for employee" +
      information.employee.firstName +
      " has been made by" +
      information.employer.firstName +
      "in company" +
      information.company.fullName +
      "  </p><br>";

    bdy += "<br><p>Thank You!</p>";

    const mailOptions = {
      from: "support@mondayready.com", // sender address
      to: "mittal.nayan@sugoilabs.com", // list of receivers Details[0].email
      subject: "User Details", // Subject line
      html: bdy // plain text body
    };
    sgMail.send(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info, "Adminnnnnnn");
        cb(1);
      }
    });
  },
  sendMailToEmployeeForSelfReview(information, cb) {
    var bdy = `<table boder="0">
                      <tr><td>Hello ${information.employee.firstName} </td></tr>
                     
                      <tr><td>Hope you are having a great and productive work weeks at ${information.employer.fullName} </td></tr>
                      <tr><td>To help yourself improve one step at a time, it's time to do a quick self review.</td></tr>
                      <tr><td><a href="www.mondayready.com">Click here to review yourself now.</a></td></tr>
                      <tr><td> &nbsp; </td></tr>
                      <tr><td>Thanks</td></tr>
                      <tr><td>  MondayReady </td></tr>
                      <tr><td><img src="https://www.jimbeamfamily.de/wp-content/uploads/2019/10/mail-sign.png" alt="Trulli" ></td></tr>
                      
                      </table>`;
    const mailOptions = {
      from: "support@mondayready.com", // sender address
      to: information.employee.email, // list of receivers Details[0].email
      subject: "Reminder to do self review on Monday Ready", // Subject line
      html: bdy // plain text body
    };
    sgMail.send(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info, "Adminnnnnnn");
        cb(1);
      }
    });
  },

  sendEmailToEmployeeWhenCreated: (information, cb) => {
    let employerName =
      information.addedBy.firstName.charAt(0).toUpperCase() +
      information.addedBy.firstName.slice(1);
    let employeeName =
      information.employee.firstName.charAt(0).toUpperCase() +
      information.employee.firstName.slice(1);
    console.log(employerName);
    console.log(employeeName);
    var bdy = `<table border="0" width="100%">
          <tr><td>Hi ${employeeName},</td></tr>
         
          <tr><td>${employerName} has added you on MondayReady. Login with the following details :</td></tr>
          <tr><td> &nbsp; </td></tr>
          <tr><td>Username : ${information.employee.email}</td></tr>
          <tr><td> &nbsp; </td></tr>
          <tr><td>Password : ${information.password}</td></tr>
          <tr><td> &nbsp; </td></tr>
          <tr><td>Login Url:<a href="www.mondayready.com"> mondayready.com</a></td></tr>
          <tr><td> &nbsp; </td></tr>
          <tr><td>Thank You</td></tr>
          <tr><td> &nbsp; </td></tr>
          <tr><td>MondayReady</td></tr>

        </table>`;

    const mailOptions = {
      from: "support@mondayready.com", // sender address
      to: information.employee.email, // list of receivers Details[0].email
      subject: `${employerName} have invited you to join MondayReady`, // Subject line
      html: bdy // plain text body
    };
    sgMail.send(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info, "Adminnnnnnn");
        cb(1);
      }
    });
  },

  sendVerifyEmail(userdetails, cb) {
    var url =
      process.env.BASE_URL + "/verification/" + userdetails.verificationKey;
    console.log(userdetails);
    let dataToBeSent = {};
    dataToBeSent.username = userdetails.fullName;
    dataToBeSent.verifyEmailUrl = url;
    const filePath = path.join(
      __dirname,
      "/mail-templates/verificationMail.html"
    );
    fs.readFile(filePath, { encoding: "utf-8" }, function(err, data) {
      if (!err) {
        Object.keys(dataToBeSent).forEach(key => {
          data = data.split("{{ " + key + " }}").join(dataToBeSent[key]);
        });

        const mailOptions = {
          from: "support@mondayready.com", // sender address
          to: userdetails.userEmail, // list of receivers Details[0].email
          subject: "Verification Mail", // Subject line
          html: data // plain text body
        };

        sgMail.send(mailOptions, function(err, info) {
          console.log(info);
          if (err) {
            console.log(err);
          } else {
            console.log(info);
            cb(1);
          }
        });
      } else {
        console.log(err);
      }
    });
  },
  sendMailOnFrequency(
    employerName,
    employerEmail,
    totalSumOfReviews,
    numberOfReviewsMissed,
    noOfEmployees,
    numberOfEmployeesReviewed,
    numberOfEmployeeAdded,
    cb
  ) {
    const msg = {
      from: "support@mondayready.com",
      templateId: "d-e597e43588fb4cea97678c7a3eb04b0c",
      personalizations: [
        {
          to: [
            {
              email: employerEmail
            }
          ],

          dynamic_template_data: {
            username: employerName,
            numberOfReviewsMade: totalSumOfReviews,
            numberOfReviewsMissed: numberOfReviewsMissed,
            numberOfEmployees: noOfEmployees,
            numberOfNewEmployees: numberOfEmployeeAdded,
            numberOfEmployeesReviewed: numberOfEmployeesReviewed,
            subject: "Weekly Report MondayReady"
          }
        }
      ]
    };

    sgMail.send(msg, function(err, info) {
      console.log(info);
      if (err) {
        console.log(err);
      } else {
        console.log(info);
        cb(1);
      }
    });
  },

  sendMailOfEmployeeReview: (
    reviewDetails,
    improvement,
    good,
    average,
    reviewDate,
    employerName,
    cb
  ) => {
    let dataToBeSent = {};

    dataToBeSent.reportData = {
      improvement,
      good,
      average
    };
    let finalReviewDate = new Date(reviewDate);
    dataToBeSent.improvement = improvement;
    dataToBeSent.good = good;
    dataToBeSent.average = average;
    dataToBeSent.reviewDate = finalReviewDate;
    let employeeEmail = reviewDetails.employeeId.email;
    dataToBeSent.username = reviewDetails.employeeId.firstName;
    const filePath = path.join(
      __dirname,
      "/mail-templates/employeeReport.html"
    );
    console.log(dataToBeSent, "9(((((((((((((((((((((((((((((((((((((((((((((");
    const msg = {
      // from: "support@mondayready.com",
      from: {
        email: "support@mondayready.com",
        name: "Monday Ready"
      },
      templateId: "d-47035cc19cd547458414d9b5e7d0cb0c",
      personalizations: [
        {
          to: [
            {
              email: employeeEmail
            }
          ],

          dynamic_template_data: {
            username: dataToBeSent.username,
            reviewDate: dataToBeSent.reviewDate,
            improvement: dataToBeSent.improvement,
            good: dataToBeSent.good,
            average: dataToBeSent.average,
            subject: `[MondayReady] ${employerName} : your report card is ready`
          }
        }
      ]
    };

    sgMail.send(msg, function(err, info) {
      console.log(info);
      if (err) {
        console.log(err);
      } else {
        console.log(info);
        cb(1);
      }
    });
  },
  sendMailToAdminToReviewEmployee: (
    emailOfEmployeesDataNotReviewed,
    employerName,
    employerEmail,
    cb
  ) => {
    const msg = {
      from: "support@mondayready.com",
      templateId: "d-499217aefd42497c8cca9baab53eff4c",
      personalizations: [
        {
          to: [
            {
              email: employerEmail
            }
          ],

          dynamic_template_data: {
            username: employerName,
            employees: emailOfEmployeesDataNotReviewed,
            subject: "Everyday MondayReady"
          }
        }
      ]
    };

    sgMail.send(msg, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
        cb(1);
      }
    });
  }
};
