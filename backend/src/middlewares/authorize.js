const authorize = (roles) => {
    return (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).send({ message: 'Unauthorized' });
      }
  
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
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

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user; // user đã được xác thực từ middleware trước đó

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
}

function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user; // Đã được xác thực ở middleware trước (qua JWT hoặc session)

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
}

module.exports = {
  authorize,
  authorizeRoles,
  authorizeRole
}
