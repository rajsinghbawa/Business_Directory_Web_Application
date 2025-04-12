const User = require("../models/User");
const Business = require("../models/Business");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register (User or Business)
exports.register = async (req, res) => {
  const { name, email, password, role, incorporationType } = req.body;

  try {
    const existing = await (role === "business" ? Business : User).findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    let newUser;

    if (role === "business") {
      newUser = await Business.create({
        name,
        email,
        password: hashedPassword,
        incorporationType,
        role
      });
    } else {
      newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role
      });
    }

    const token = generateToken(newUser._id, newUser.role);
    res.status(201).json({ token, user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login (User or Business)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let foundUser = await User.findOne({ email }) || await Business.findOne({ email });
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(foundUser._id, foundUser.role);
    res.status(200).json({ token, user: foundUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
