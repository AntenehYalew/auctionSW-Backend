// prettier-ignore
const express = require("express"),
          jwt = require("jsonwebtoken"),
          md5 = require("md5"),
          con = require("./models/dbconnection"),
       router = express.Router();

router.route("/login").post((req, res) => {
  let user_name = {
    //User name with an maximum of 30 min expiry date to set for session
    name: req.body.userName.toUpperCase(),
    exp: Math.floor(Date.now() / 1000) + 60 * 30,
  };
  let user_password = req.body.password;
  con.query(
    `SELECT * FROM auction.ilance_users WHERE username = "${user_name.name}"`, //Connect to DB to search for the user name
    (err, userFound) => {
      if (
        !err &&
        userFound &&
        userFound.length === 1 &&
        userFound[0].username.toUpperCase() === user_name.name
      ) {
        const rowSalt = userFound[0].salt; //Salet from DB
        const savedPassword = userFound[0].password; //Password from DB
        if (md5(md5(user_password) + rowSalt) === savedPassword) {
          //Token Activation
          const accessToken = jwt.sign(
            user_name,
            process.env.ACCESS_TOKEN_SECRET
          );
          //Send data as Json with token
          res.json({
            token: accessToken,
            code: 200,
            message: `Logged in as ${user_name.name}`,
            success: true,
          });
        } else {
          res.json({
            code: 404,
            message: `User name or password does not match`,
            success: false,
            error: err,
          });
        }
      } else {
        res.json({
          code: 404,
          message: ` match`,
          success: false,
          error: err,
        });
      }
    }
  );
});

module.exports = router;
