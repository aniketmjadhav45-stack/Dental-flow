const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// ✅ User Schema (Admin / Doctor / Patient)
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  role: String // admin | doctor | patient
});

// ✅ Signup API
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role
    });

    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// ✅ Login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API Working 🚀");
});

// ✅ Server Start
app.listen(5000, () => console.log("Server running on port 5000"));
