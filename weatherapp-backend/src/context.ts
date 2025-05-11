import "dotenv/config";
import jwt from "jsonwebtoken";
import { IncomingMessage } from "http";
import { TokenPayload, MyContext } from "./types";
import userModel from "./models/userModel";

const secret = process.env.SECRET;
if (!secret) {
  throw new Error("SECRET must be defined in environment variables");
}

interface ContextType {
  req: IncomingMessage;
}

const context = async ({ req }: ContextType): Promise<MyContext> => {
  const authorization = req.headers.authorization;

  // console.log("Authorization Header:", authorization);

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.substring(7);
    if (!token) return {};

    try {
      // console.log("Token:", token);

      const decodedToken = jwt.verify(token, secret) as TokenPayload;

      // console.log("Decoded Token:", decodedToken);

      if (!decodedToken.id) return {};

      const currentUser = await userModel.findById(decodedToken.id);
      if (!currentUser) return {};

      // console.log("Current User:", currentUser);

      return {
        id: decodedToken.id,
        username: currentUser.username,
        name: currentUser.name,
        city: currentUser.city,
        state: currentUser.state,
        country: currentUser.country,
        currentUser,
      };
    } catch (error) {
      console.error("Error verifying token:", error);
      return {};
    }
  }
  return {};
};

export default context;
