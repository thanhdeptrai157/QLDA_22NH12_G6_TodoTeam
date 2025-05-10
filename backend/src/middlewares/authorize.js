const authorize = (roles) => {
    return (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).send({ message: 'Unauthorized' });
      }
  
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, 'your_secret_key');
        if (!roles.includes(decoded.role)) {
          return res.status(403).send({ message: 'Forbidden' });
        }
        req.user = decoded; // Lưu thông tin user vào req để sử dụng sau
        next();
      } catch (error) {
        return res.status(401).send({ message: 'Invalid token' });
      }
    };
};
  module.exports = {authorize}