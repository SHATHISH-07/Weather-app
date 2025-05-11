import UserModel from "../../../models/userModel";
import { UserDocument } from "../../../types";

const createUserResolver = {
  Mutation: {
    createUser: async (
      _: unknown,
      args: {
        name: string;
        username: string;
        city: string;
        state: string;
        country: string;
        password: string;
      }
    ): Promise<Partial<UserDocument>> => {
      const existingUser = await UserModel.findOne({ username: args.username });
      if (existingUser) {
        throw new Error("Username already exists");
      }

      const newUser = new UserModel(args);
      const savedUser = await newUser.save();

      return {
        id: savedUser._id,
        name: savedUser.name,
        username: savedUser.username,
        city: savedUser.city,
        state: savedUser.state,
        country: savedUser.country,
      };
    },
  },
};

export default createUserResolver;
