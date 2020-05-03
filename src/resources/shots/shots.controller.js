import { Shot, validateShot } from "./shots.model";
import pick from "lodash.pick";

const shotController = {
  async createShot(req, res) {
    try {
      const { error } = validateShot(req.body);
      if (error) {
        return res.status(400).send(error.details[0]);
      }

      let shot = new Shot(
        pick(req.body, ["title", "description", "author", "image", "draft"])
      );
      await shot.save();
      res.status(200).send(shot);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async getShots(req, res) {
    try {
      const shots = await Shot.find().sort("createdAt");
      res.status(200).send(shots);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async readShot(req, res) {
    try {
      const shot = await Shot.findById(req.params.id);
      if (!shot) {
        return res.status(404).send("Requested Shot Not Found");
      }

      res.status(200).send(shot);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async updateShot(req, res) {
    try {
      const shot = await Shot.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
      });

      res.status(200).send(shot);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async deleteShot(req, res) {
    try {
      const shot = await Shot.deleteOne({ _id: req.params.id });
      res.status(200).send(shot);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

export default shotController;
