const { loginUser, registerUser } = require("../services/authService");

exports.register = async (req, res, next) => {
  try {
    const result = await registerUser(req.body);

    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }

    return res.status(result.status).json(result.data);
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);

    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }

    return res.status(result.status).json(result.data);
  } catch (error) {
    return next(error);
  }
};

exports.me = (req, res) => res.json(req.user);
