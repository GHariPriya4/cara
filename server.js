const express = require("express");
const app = express();

app.use(express.static("public"));

// Add middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
const path = require("path");

mongoose
  .connect("mongodb://127.0.0.1:27017/shoppinguserDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

const userSchema = new mongoose.Schema({
  fName: String,
  email: String,
  subject: String,
  message: String,
});

const MyUser = mongoose.model("carausers", userSchema);

app.post("/contact", async function (req, res) {
  try {
    const user = new MyUser({
      fName: req.body.fName,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });

    await user.save(); // Use await with save() to handle the promise
    res.redirect("/contact");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.get("/contact", function (req, res) {
  res.sendFile(path.join(__dirname, "public","contact.html"));
});
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public","index.html"));
});


app.listen(3000, function () {
  console.log("server started on port 3000");
});

  