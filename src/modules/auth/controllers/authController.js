const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { AspNetUsers, AspNetMembership } = require("../models");
const { generateHashPassword } = require("../../../utils/hashUtils");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Sign-in Controller
const signIn = async (req, res) => {
  const { userName, password } = req.body;

  try {
    // Find user by username
    const user = await AspNetUsers.findOne({
      where: { userName },
      include: {
        model: AspNetMembership,
        as: "membership",
      },
    });

    if (!user || !user.membership) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const membership = user.membership;

    console.log("Stored Password:", membership.Password);
    console.log("Stored Salt:", membership.PasswordSalt);

    // Generate the hash of the provided password using the stored salt
    const hashedPassword = generateHashPassword(
      password,
      membership.PasswordSalt
    );

    console.log("Generated Hash:", hashedPassword);

    // Compare the generated hash with the stored hash
    if (hashedPassword !== membership.Password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        nameid: user.UserName,
        // UserId: user.UserId,
        // UserName: user.UserName,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // res.status(200).json({ token, message: "Sign-in successful" });
    res.status(200).json({
      type: "",
      title: "Authorized",
      status: "200",
      traceId: "",
      data: token,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ error: "Sign-in failed" });
  }
};

module.exports = { signIn };
