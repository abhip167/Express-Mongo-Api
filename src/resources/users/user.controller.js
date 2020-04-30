import { User } from "./user.model";
import pick from "lodash.pick";

const userController = {
  async createUser(req, res) {
    try {
      let user = new User(pick(req.body, ["email", "password", "username"]));
      // let user = new User(req.body); ====> This will also Work Fine
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

  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.deleteOne({ _id: req.params.id });
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async getProfile(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send("User Not Found");
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async getDashboard(req, res) {
    try {
      res.status(200).send("You Must Sign In First");
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

export default userController;
