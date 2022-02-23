const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../modal/User");
const hasher = require("../utils/Hasher");
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  //Generate hash
  const hashResult = await hasher(password);
  const { salt, hashedpassword } = hashResult;
  //Checking if user already exists
  const emailExists = await User.findOne({
    email: email,
  });
  if (emailExists) {
    return res.status(400).send("Email is already registered.");
  }
  // New user
  const user = new User({
    username: username,
    email: email,
    salt: salt,
    password: hashedpassword,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //Checking if user does not exists
  const user = await User.findOne({
    email: email,
  });
  if (!user) {
    return res.status(400).send("User does not exists.");
  }
  //Generate hash
  const hashResult = await hasher(password, user.salt);
  const { hashedpassword } = hashResult;
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.TOKEN_SECRET
  );
  if (hashedpassword === user.password) {
    res.header("auth-token", token).send({
      token: token,
      user: user,
    });
  } else {
    return res.send("Password is Invalid");
  }
});

module.exports = router;
