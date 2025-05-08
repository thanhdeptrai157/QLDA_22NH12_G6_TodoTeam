# Middleware Practices

Middleware functions should be small and focused.

Use a validation middleware (e.g., using Joi or express-validator).

Use auth middleware to verify tokens and attach user data.

Place middleware in the /middlewares folder and export them by function.
