const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../../modal/User");
const hasher = require("../../utils/Hasher");
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  //Checking if user does not exists
  const user = await User.findOne({
    email: email,
  });
  console.log(user, email);
  if (!user) {
    const response = {
      responseType: false,
      error: "User does not exists.",
    };
    return res.send(response);
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
  if (hashedpassword !== user.password) {
    const response = {
      responseType: false,
      error: "Wrong password.",
    };
    return res.send(response);
  }
  if (hashedpassword === user.password) {
    res.header("auth-token", token).send({
      responseType: true,
      error: false,
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
        token: token,
      },
    });
  } else {
    return res.send("Something went wrong.");
  }
});

module.exports = router;
