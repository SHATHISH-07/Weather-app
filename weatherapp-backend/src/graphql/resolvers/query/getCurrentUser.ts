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
        city: user.city,
        state: user.state,
        country: user.country,
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
        city: user.city,
        state: user.state,
        country: user.country,
      };
    },

    getCurrentUser: async (
      _: unknown,
      __: unknown,
      { currentUser }: { currentUser: UserDocument | null }
    ): Promise<Partial<UserDocument> | null> => {
      if (!currentUser) {
        throw new Error("User not authenticated");
      }

      return {
        id: currentUser._id,
        name: currentUser.name,
        username: currentUser.username,
        city: currentUser.city,
        state: currentUser.state,
        country: currentUser.country,
      };
    },
  },
};

export default getUsersResolver;
