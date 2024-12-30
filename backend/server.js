const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Create a connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Signup endpoint
app.post("/signup", (req, res) => {
  console.log(req.body);
  const sql = "INSERT INTO login (name, email, password) VALUES (?,?,?)";
  const values = [req.body.name, req.body.email, req.body.password];

  // Pass the 'values' array directly, not wrapped in another array
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database Error:", err); // Log the error
      return res.status(500).json({ message: "Database error", error: err }); // Send more details in the response
    }
    return res.status(200).json({ message: "Signup successful", data: data });
  });
});

// Start the server
app.listen(8081, () => {
  console.log("Server is running on http://localhost:8081");
});
