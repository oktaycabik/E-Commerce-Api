const jwt = require("jsonwebtoken");
const errorWrapper = require("../../helpers/error/errorWrapper");
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require("../../helpers/authorization/tokenHelpers");

const CustomError = require("../../helpers/error/customError");

const getAccessToRoute = errorWrapper(async (req, res, next) => {
  // Is Token Included
  const {JWT_SECRET_KEY}=process.env
  if (!isTokenIncluded(req)) {
    return next(
      new CustomError("You are not authorized to access this page", 403)
    );
  }

  // Get Token From Header

  const accessToken = getAccessTokenFromHeader(req);

  // Control If Token Valid

  jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(
        new CustomError("You are not authorized to access this page", 401)
      );
    }
    req.user = {
      id: decoded.id,
      name: decoded.name,
      favorites:decoded.favorites
    };
    next();
  });
});

module.exports = {
  getAccessToRoute,
};
