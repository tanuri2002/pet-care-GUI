const express = require('express');  //imports the Express library, which is used to create a web server in Node.js.
const mongoose = require('mongoose'); //imports Mongoose, a library that provides a schema-based solution to model your application data in MongoDB.
const cors = require('cors'); //CORS (Cross-Origin Resource Sharing) is a middleware that allows your server to accept requests from different origins (domains). This is particularly useful when your frontend and backend are on different domains.
const dotenv = require('dotenv'); //This module loads environment variables from a .env file into process.env. It's a good practice to store sensitive information like database URLs or API keys in environment variables.
const CustomerModel=require('./models/Customer'); //This model defines the structure of the data in your MongoDB collection.
dotenv.config();

const app = express(); //Creates an instance of an Express application
const port = process.env.PORT || 5000; //sets the port for the server to listen on. It checks if there’s a PORT variable in your environment variables (process.env.PORT). If not, it defaults to 5000.

app.use(cors()); //Enables CORS, allowing your API to accept requests from different origins.
app.use(express.json()); //This middleware parses incoming JSON requests and makes the data available in req.body.

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/petapp"); //tells Mongoose to connect to a MongoDB instance running locally on your machine (127.0.0.1), using port 27017, and to use (or create) a database named customer.

//customer login
app.post('/login' ,(req,res)=>{
  const {email,password}=req.body;
  CustomerModel.findOne({email:email})
  .then(user => {
    if(user){
      if(user.password === password){
        res.json("Success")
      }else{
        
        res.json("The password is incorrect")
      }
    }else{
      res.json("No record existed");
    }
  })
})
// Route for Registering a Customer
app.post('/register', (req, res) => {
  console.log('Register Route Triggered');
  console.log('Request Body:', req.body); 
  CustomerModel.create(req.body)  
    .then(customers => res.json(customers))
    .catch(err => {
      console.error('Error:', err);
      res.status(500).json({ message: 'Error inserting data', error: err });
    });
});

// Route for Handling Feedback
// app.post('/feedback', (req, res) => {
//   console.log('Feedback Route Triggered');
//   console.log('Request Body:', req.body); 
//   FeedbackModel.create(req.body)  
//     .then(feedbacks => res.json(feedbacks))
//     .catch(err => {
//       console.error('Error:', err);
//       res.status(500).json({ message: 'Error inserting feedback', error: err });
//     });
// });


// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected');
//   })
//   .catch((error) => {
//     console.error('Connection error', error.message);
//   });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);  //confirms that the server is running.
});
