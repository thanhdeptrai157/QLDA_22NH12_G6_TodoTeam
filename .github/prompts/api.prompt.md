# Express REST API Standards

Each route handler should be placed in its own controller file.

Use express.Router() to define route modules.

Separate concerns: routes, controllers, services.

Use try-catch in async handlers to manage errors.

Use middleware for authentication and validation.

Respond using res.status().json({...}).
