import mongoose from "mongoose";
import pick from "lodash.pick";
import bcrypt from "bcryptjs";
import Joi from "@hapi/joi";
import jwt from "jsonwebtoken";
import config from "../../config";

// Create a Schema ( data modelling)
const schema = {
    email: {
        type: String,
        required: [true, "Please Enter an Email"],
        trim: true,
        unique: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: [true, "Please Enter an Username"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please Enter an Password"],
        trim: true,
        minLength: 6,
    },
    isAdmin: Boolean,
    photoUrl: String,
    bio: String,
    url: String,
};
const userSchema = new mongoose.Schema(schema, { timestamps: true });

// Hash Password before saving to Database
// Here "this" is the User Object
userSchema.pre("save", async function (next) {
    if (this.isModified) {
        // isModified() bcz jo agar user navo generate thaay che tyare to pass hassh thasej but agar modify thaay che i.e Update to change nai thaay etle isModified lagavanu
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } else {
        next();
    }
});

// Choose What to send to the client
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    return pick(userObject, [
        "_id",
        "email",
        "username",
        "photoUrl",
        "bio",
        "url",
        "isAdmin",
    ]);
};

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            isAdmin: this.isAdmin,
        },
        config.secrets.JWT_SECRET
    );

    return token;
};

export const User = mongoose.model("user", userSchema);

export function validateUser(data) {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),

        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        }),
    });

    return schema.validate(data);
    // -> { value: { username: 'abc', birth_year: 1994 } }
    // const schema = Joi.object({
    //   email: Joi.string()
    //     .required()
    //     .label("Please Enter Email")
    //     .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    //     .label(" Not a Valid Email"),
    //   password: Joi.string()
    //     .required()
    //     .label("Please Enter a password min. of 3 characters"),
    //   username: Joi.alphanum().min(3).max(30).required(),
    // });

    // return schema.validate(data);
}
