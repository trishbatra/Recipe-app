const jwt = require('jsonwebtoken');
const secret = "sirftujantahai";

function fetchUser(req, res, next) {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send("Access denied");
  }
  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded.user)
    req.user = decoded.user.id;
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).send("Invalid token");
  }
}

module.exports = {
  fetchUser
};
