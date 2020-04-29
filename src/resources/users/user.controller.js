import { User } from "./user.model";
import pick from "lodash.pick";

const userController = {
  async createUser(req, res) {
    try {
      let user = new User(pick(req.body, ["email", "password", "username"]));
      await user.save();
      res.send(user);
    } catch (error) {
      res.status(400).send({
        message: error,
      });
    }
  },

  async getUsers(req, res) {
    try {
      let result = await User.find().sort();
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send({
        message: err,
      });
    }
  },
};

export default userController;
