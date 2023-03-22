import env from "react-dotenv";

export const PageTitle = {
  HOME: "EGO Studying Online",
  SIGNIN: "EGO Studying Online | Signin",
  SIGNUP: "EGO Studying Online | Signup",
  NOTFOUND: "Page Not Found"
};

export const DEFAULT_USER_AVATAR =
  "https://res.cloudinary.com/dhzbsq7fj/image/upload/v1643101647/avatardefault_92824_aifry9.png";

export const NODE_ENV = env.NODE_ENV;
export const DEVELOPMENT_URL = env.DEVELOPMENT_URL;
export const PRODUCTION_URL = env.PRODUCTION_URL;
export const BASE_URL =
  env.NODE_ENV === "production" ? PRODUCTION_URL : DEVELOPMENT_URL;
