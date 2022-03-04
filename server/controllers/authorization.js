const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
  const header = req.headers["authorization"];
  const token = header?.split(" ")[1];
  if (token == undefined) return res.sendStatus(401);
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, response) => {
      if (err) return res.sendStatus(403);
      next();
    });
  }
}

module.exports = authenticateToken;
