const { connection } = require("../config/db");

function ConnectToDatabase() {
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: ", err);
      return;
    }
    console.log("Connected to the MySQL database!");
  });
}

module.exports = { ConnectToDatabase };
