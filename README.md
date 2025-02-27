Auth:

POST /auth/signup: Register a new user.

POST /auth/signin: Authenticate a user and return a JWT token.

Users:

GET /users: Get all users (Admin only).

GET /users/:id: Get a specific user.

PATCH /users/:id: Update a user.

DELETE /users/:id: Delete a user.

Analytics:

GET /analytics/users/count: Get user count metrics.

GET /analytics/users/trends: Get user sign-up trends.

GET /analytics/users/activity: Get recent user activity.
