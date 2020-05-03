import { User, validateUser } from "./user.model";
import pick from "lodash.pick";
import bcrypt from "bcryptjs";

const userController = {
    async signIn(req, res) {
        // Find the User by Email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send("Invalid Password or Email");
        }
        // Decode Hash Password
        // console.log(user.password);
        const password = await bcrypt.compare(req.body.password, user.password);
        if (!password) {
            return res.status(400).send("Invalid Password or Email");
        }
        // Create a New Access Token
        const token = user.generateAuthToken();
        // Return User & Token
        res.header("x-access-token", token)
            .status(200)
            .render("index", { user: user });
    },

    async createUser(req, res) {
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).send(error.details[0]);
        }

        let user = new User(
            pick(req.body, ["email", "password", "username", "isAdmin"])
        );
        // let user = new User(req.body); ====> This will also Work Fine
        await User.create(user);

        const token = user.generateAuthToken();

        res.header("x-access-token", token).status(200).send(user);
    },

    async getUsers(req, res) {
        let result = await User.find().sort();
        // throw new Error("Hey Something got Wrong ( I'm in middleware )");
        res.status(200).send(result);
    },

    async updateUser(req, res) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).send(user);
    },

    async deleteUser(req, res) {
        const user = await User.deleteOne({ _id: req.params.id });
        res.status(200).send(user);
    },

    async getProfile(req, res) {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User Not Found");
        }
        res.status(200).send(user);
    },

    async getDashboard(req, res) {
        const user = await User.findById(req.user._id);
        res.status(200).send(user);
    },
};

export default userController;
