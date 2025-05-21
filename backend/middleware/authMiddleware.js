const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect =async (req,res,next)=>{
const authHeader=req.headers.authorization;
if(authHeader &&authHeader.startsWith('Bearer')){
    try{
        const token=authHeader.split(' ')[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
    }
    catch (err) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
}
    else {
        res.status(401).json({ message: 'No token, authorization denied' });
    }
};
module.exports=protect;

