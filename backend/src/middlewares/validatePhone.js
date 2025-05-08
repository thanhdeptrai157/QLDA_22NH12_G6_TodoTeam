
// validation phone number function
function validatePhone(phone) {
    // Regular expression to validate phone number
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
}
// Middleware function to validate phone number
function validatePhoneMiddleware(req, res, next) {
    const { phone } = req.body;
    if (!phone) {
        return res.status(400).json({ message: 'Phone number is required' });
    }
    if (!validatePhone(phone)) {
        return res.status(400).json({ message: 'Invalid phone number format' });
    }
    next();
}
// Export the middleware function
module.exports = validatePhoneMiddleware;
