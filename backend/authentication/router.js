const authRouter = require("express").Router();
const joi = require("joi");

const { schemaValidator } = require("../core/middlewares");
const { sendMail } = require("../core/mailer");
const { ForbiddenError } = require("../core/errors");

const { User } = require("../users/models");
const { VerificationToken } = require("./models");
const {
  verificationEmail,
  generateVerificationToken,
  validateVerificationToken,
  hash,
  compareHash,
} = require("./utils");

const registerSchema = joi.object({
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(8)
    .message("Password must be at least 8 characters long")
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])"))
    .message(
      "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
    )
    .required(),
  confirm_password: joi
    .equal(joi.ref("password"))
    .messages({ "any.only": "Passwords do not match" })
    .required(),
});
authRouter.post(
  "/register",
  schemaValidator(registerSchema),
  async (req, res) => {
    if (await User.findOne({ where: { email: req.body.email } })) {
      throw new ForbiddenError("Email already in use");
    }

    const user = await User.create({
      ...req.body,
      password: await hash(req.body.password),
    });

    const verificationToken = await VerificationToken.create({
      content: generateVerificationToken(user.id),
    });
    // await sendMail(verificationEmail(req.body.email, verificationToken));

    res.json(user);
  }
);

authRouter.get("/verify/:token", async (req, res) => {
  const tokenString = req.params.token;

  let verificationTokenRecord = await VerificationToken.findOne({
    where: { content: tokenString },
  });
  if (!verificationTokenRecord) {
    throw new ForbiddenError("Invalid verification token");
  }

  let decodedToken = undefined;
  try {
    decodedToken = validateVerificationToken(tokenString);
  } catch (err) {
    throw new ForbiddenError("Invalid verification token");
  }

  const user = await User.findByPk(decodedToken.userId);
  if (!user) {
    throw new ForbiddenError("Invalid verification token");
  }

  if (user.verified) {
    throw new ForbiddenError("Your account has already been verified");
  }

  user.verified = true;
  await user.save();

  await verificationTokenRecord.destroy();

  res.status(200).send("Your account has been verified!");
});
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ForbiddenError("please enter your email and password");
  }
  const user = await User.findOne({ where: { email } });
  if (!user || !(await compareHash(password, user.password)))
    throw new ForbiddenError("invalid Email or password!");
  const loginToken = generateVerificationToken(user.id);
  res.status(200).json({
    status: "OK!",
    loginToken,
    user,
  });
});

module.exports = { authRouter };
