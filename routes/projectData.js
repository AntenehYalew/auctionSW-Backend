// prettier-ignore
const express  = require("express"),
      sqlQuery = require("./models/sqlQuery"),
           con = require("./models/dbconnection"),
        router = express.Router()

router.route("/projects").get((req, res) => {
  con.query(sqlQuery, (err, projects) => {
    if (!err) {
      res.json(projects);
    } else {
      res.json(err);
    }
  });
});

module.exports = router;
