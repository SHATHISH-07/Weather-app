import UserModel from "../../../models/userModel";
import { UserDocument } from "../../../types";

const getUsersResolver = {
  Query: {
    getUsers: async (): Promise<Partial<UserDocument>[]> => {
      const users = await UserModel.find();
      if (!users || users.length === 0) {
        throw new Error("No users found");
      }

      return users.map((user) => ({
        id: user._id,
        name: user.name,
        username: user.username,
      }));
    },

    getUser: async (
      _: unknown,
      args: { username: string }
    ): Promise<Partial<UserDocument> | null> => {
      const user = await UserModel.findOne({ username: args.username });
      if (!user) {
        throw new Error("User not found");
      }

      return {
        id: user._id,
        name: user.name,
        username: user.username,
      };
    },
  },
};

export default getUsersResolver;
