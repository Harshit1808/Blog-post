const jwt = require('jsonwebtoken');
const { User } = require('../model/userSchema');
const authenticate = (req, res, next) => {
  try {
    console.log("auth check")
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secret');
    const userId = decoded.userId;
    const user = User.findById(userId);
    if (!user) {
      throw new Error();
    }
    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = authenticate;