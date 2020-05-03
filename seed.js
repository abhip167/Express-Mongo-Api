import faker from "faker";
import sample from "lodash.sample";

import { User } from "./src/resources/users/user.model";
import { Shot } from "./src/resources/shots/shots.model";

export const seedUsers = async () => {
    try {
        const usersCollection = await User.estimatedDocumentCount();
        if (usersCollection !== 0) {
            return console.log("Users Collection is Already Loaded");
        }

        const users = [];
        const quantity = 10;

        for (let u = 0; u < quantity; u++) {
            users.push(
                new User({
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    username: faker.internet.userName(),
                    photoUrl: faker.internet.avatar(),
                    bio: faker.lorem.paragraph(),
                    url: faker.internet.url(),
                })
            );
        }

        await User.deleteMany();

        users.forEach((user) => {
            User.create(user);
        });

        console.log("Users Collection has been Populated.");
    } catch (error) {
        console.log(error);
    }
};

export const seedShots = async () => {
    try {
        const shotsCollection = await Shot.estimatedDocumentCount();
        const usersCollection = await User.find();
        if (shotsCollection !== 0) {
            return console.log("Shots Collection is Already Loaded");
        }

        const shots = [];
        const quantity = 10;

        for (let s = 0; s < quantity; s++) {
            const randomAuthor = await sample(usersCollection);
            if (randomAuthor) {
                shots.push(
                    new Shot({
                        title: faker.commerce.productName(),
                        description: faker.lorem.sentence(),
                        author: randomAuthor._id,
                        image: faker.image.food(640, 480),
                        draft: faker.random.boolean(),
                    })
                );
            }
        }

        await Shot.deleteMany();
        shots.forEach((shot) => {
            Shot.create(shot);
        });

        console.log("Shots Collection has been populated Successfully");
    } catch (error) {
        console.log("Shots", error);
    }
};
