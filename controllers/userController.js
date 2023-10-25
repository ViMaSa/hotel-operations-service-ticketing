const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const pepper = process.env.PEPPER;
const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN;

exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] }
    });

    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: user });
  } catch (err) {
    next(err);
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    const validation = validateData(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error });
    }
    if (!isValidPassword(req.body.password)) {
      return res.status(400).json({ error: "Password validation failed" });
    }

    req.body.email = req.body.email.toLowerCase();
    const user = await User.create(req.body);
    user.password = await hashPassword(user.password);

    await user.save();
    res.status(201).send({ message: "Registration successful!" });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    req.body.email = req.body.email.toLowerCase();
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email }});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordFlag = await checkPassword(password, user.password);
    if (!passwordFlag) {
      return res.status(404).json({ message: "Incorrect password" });
    }

    const token = createToken(user.id);

    res.status(200).send({
      message: "Login Successful!",
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const submittedPassword = req.body.password;

    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordFlag = await checkPassword(submittedPassword, user.password);
    if (!passwordFlag) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    if (req.body.email) user.email = req.body.email;
    if (req.body.first_name) user.first_name = req.body.first_name;
    if (req.body.last_name) user.last_name = req.body.last_name;

    if (req.body.newPassword) {
      if (!isValidPassword(req.body.newPassword)) {
        return res.status(400).json({ error: "Password validation failed" });
      }

      user.password = await hashPassword(req.body.newPassword);
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    next(err);
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const submittedPassword = req.body.password;

    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordFlag = await checkPassword(submittedPassword, user.password);
    if (!passwordFlag) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    await user.destroy();
    res.status(200).json({ message: "User has been successfully deleted!" });
  } catch (err) {
    next(err);
  }
};

const checkPassword = async (submittedPassword, userHashedPassword) => {
  const pepperedPassword = submittedPassword + pepper;
  return await bcrypt.compare(pepperedPassword, userHashedPassword);
};

const createToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: EXPIRES_IN
  });
};

const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const findUserById = async (userId) => {
  return await User.findOne({
    where: {
      id: userId,
    },
  });
};

const hashPassword = async (password) => {
  const passwordWithPepper = password + pepper;
  return await bcrypt.hash(passwordWithPepper, saltRounds);
};

const validateData = (submittedData) => {
  if(!submittedData.email) {
    return { isValid: false, error: "Email is required" };
  }
  if(!submittedData.password) {
    return { isValid: false, error: "Password is required" };
  }
  if(!submittedData.first_name) {
    return { isValid: false, error: "First name is required" };
  }
  if(!submittedData.last_name) {
    return { isValid: false, error: "Last name is required" };
  }

  return { isValid: true };
};