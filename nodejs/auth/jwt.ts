import jwt from "jsonwebtoken";

/** custom your settings */
const jwtSecret = process.env.JWT_SECRET || "/your-secret/";
const tokenExpire = process.env.TOKEN_EXPIRE;

type Options = {
  algorithms?: "HS256" | "HS384";
  audience?: string;
  maxAge?: string;
};

const generateToken = async (data: object, options: Options = {}) => {
  return jwt.sign(data, jwtSecret, {
    expiresIn: tokenExpire,
    ...options,
  });
};

const verify = (token: string) => jwt.verify(token, jwtSecret);

export { generateToken, verify };
