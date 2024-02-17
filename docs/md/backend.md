# Backend
These are general practices that backend developers should follow.

## Directory Structure
```sh
.
├── core					# things that are relevant in the entire project
│   ├── db.js				# sequelize database connection settings
│   ├── define_route.js		# implementation of `defineRoute()` function (described below)
│   ├── errors.js			# error classes (e.g., validation errors)
│   ├── mailer.js			# mail server configuration
│   ├── middlewares.js		# common middlewares
│   └── swagger.js			# swagger docs options
├── Dockerfile
├── index.js				# main entry point
├── package.json
├── package-lock.json
├── feature_x				# directory of feature x (e.g., users, offers, auth, etc...), every feature should live in its own directory
│   ├── middlewares.js		# middlewares scoped to that feature (can also be used by other features or index.js)
│   ├── models.js			# sequelize models
│   ├── router.js			# implementation of all endpoints in this feature
│   └── utils.js			# utility methods used by routers (can be used by other features or index.js)
├── feature_y
├── feature_z

```

## Routes
Routes should be defined in the following way:
```javascript
const inputSchema = joi.object({
    // joi input schema
});
defineRoute({
	router, // can either be an express app or an express router object (required)
    feature, // name of the feature to which this endpoint belongs (e.g., auth, offers, users, etc...) (required)
	path, // route path  (required)
	method, // HTTP verb  (required)
	description, // quick summary of what this endpoint does  (optional)
	inputSchema, // joi schema object to validate the request body (also used in the docs UI) (optional)
	middlewares, // an array containing desired middleware functions to run before the route handler (optional)
	handler, // a plain old express route handler function (required)
});
```

The reason why it's setup this way is that it saves time by automatically setting up validation (via the joi input schema) and generating swagger docs.

### Example
```js
const loginSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required()
});
defineRoute({
	router: authRouter,
    feature: "auth",
	path: "/login",
	method: "post",
	description: "obtain a jwt given email and password ",
	inputSchema: loginSchema,
	handler: async (req, res) => {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });
		if (!user || !(await compareHash(password, user.password)))
			throw new ForbiddenError("invalid Email or password!");
		const token = generateAuthorizationToken(user.id);
		res.json({
			token,
			user
		});
	}
});
```

Also, note that the handler function should always be defined as `async`.

