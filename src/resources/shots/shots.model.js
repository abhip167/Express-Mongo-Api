import mongoose from "mongoose";
import pick from "lodash.pick";
import Joi from "@hapi/joi";

const schema = {
  title: {
    type: String,
    required: [true, "Please Enter Title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Description"],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Please Name the Author"],
    trim: true,
  },
  image: {
    type: String,
  },
  draft: {
    type: Boolean,
    default: false,
  },
};

const shotSchema = new mongoose.Schema(schema, {
  timestamps: true,
});

shotSchema.methods.toJSON = function () {
  let shotObject = this.toObject();
  return pick(shotObject, [
    "_id",
    "title",
    "description",
    "author",
    "image",
    "draft",
  ]);
};

export const Shot = mongoose.model("shot", shotSchema);

export function validateShot(data) {
  const schema = Joi.object({
    title: Joi.string().required().label("Please Enter Title"),
    description: Joi.string(),
    author: Joi.string().required().label("Please Add the Author Name"),
  });

  return schema.validate(data);
}
