const jwt = require('jsonwebtoken');
const secret = "sirftujantahai";
const multer =  require("multer")
const path =  require("path")
const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null, '../frontend/public/Images')
  },
  filename: (req,file,cb)=>{
    console.log("file", file)
    cb(null, Date.now() + path.extname(file.originalname) )
  }
})

const upload  = multer({storage: storage})
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
  fetchUser,
  upload
};
