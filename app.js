//jshint esversion:6

require("dotenv").config();
// prettier-ignore
const express = require("express"),
          cors = require("cors"),
          app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //parsing req
require("./routes")(app);

app.listen(process.env.PORT || "3001", () => {
  console.log("Connected to local Server 3001 or your web hosting Post");
});
