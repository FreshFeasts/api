const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).json({ msg: 'Not authenticated' });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    console.log('Attempting to decode...');
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || 'Token could not be decoded' });
  }
  if (!decodedToken) {
    res.status(401).json({ msg: 'Unauthorized' });
  } else {
    console.log('Successfully decoded token...');

    req.user = decodedToken;

    next();
  }
};

module.exports = isAuth;
