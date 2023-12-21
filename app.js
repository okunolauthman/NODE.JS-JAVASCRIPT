//Tested & Completed

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://okunolauthman:FP2sY3vZhneNBZQm@cluster0.9liicgv.mongodb.net/Patient",
  {
    //Note: Patient Db is automatically created when included in the URI Path above
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Create a mongoose model for the "users" collection
const User = mongoose.model("User", {
  //user collection is automatically created
  name: String,
  email: String,
});

// Middleware to parse JSON in the request body
app.use(express.json());

// Route to handle user creation(can be tested on postman)
app.post("/createUser", async (req, res) => {
  try {
    // Create a new user based on the request body
    const newUser = new User({
      name: "John Doe",
      email: "john.doe@example.com",
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
