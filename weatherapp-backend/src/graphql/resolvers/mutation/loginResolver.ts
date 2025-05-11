// src/graphql/resolvers/authResolvers.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../../../models/userModel";

const secret = process.env.SECRET || "your-secret-key";

const authResolvers = {
  Mutation: {
    login: async (_: unknown, args: { username: string; password: string }) => {
      const { username, password } = args;

      const user = await UserModel.findOne({ username });
      if (!user) {
        throw new Error("Invalid credentials");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign(
        { id: user._id, username: user.username },
        secret,
        { expiresIn: "1h" }
      );

      return { id: user._id, username: user.username, token };
    },
  },
};

export default authResolvers;
