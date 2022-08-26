import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFile = fs.readFileSync(
    path.join(__dirname, "../data", "users.json"),
    { encoding: "utf-8", flag: "r" }
);

const usersData = JSON.parse(usersFile);

// Get all users
export const getUsers = (req, res) => {
    let users = usersData;

    if (users.length > 0 || users.users.length > 0) {
        return res.status(200).json(usersData);
    } else {
        return res.status(404).json({ message: "No users found" });
    }
};

// Get user by id
export const getUser = (req, res) => {
    const { id } = req.params;

    let findUser = usersData.users.filter((user) => user.id === parseInt(id));

    if (findUser) {
        return res.status(200).json(findUser);
    } else {
        return res.status(404).json({ message: "User not found" });
    }
};

// Create user
export const createUser = async (req, res) => {
    const user = req.body;
    try {
        user.id = usersData.users.length + 1; // Generate id

        // Create new user object
        let newUser = { ...user };

        // Add new user to users.json
        let newUSer2 = "," + JSON.stringify(newUser, null, 4) + ",";

        usersData.users.push(newUser);

        fs.writeFileSync(
            path.join(__dirname, "../data", "users.json"),
            JSON.stringify(usersData, null, 4),
            { encoding: "utf-8", flag: "w" }
        );

        return res.status(201).json(newUser);
    } catch (error) {
        throw new error("Error creating user");
    }
};

// Delete user by id
export const deleteUser = (req, res) => {
    const { id } = req.params;
    try {
        usersData.users.map((user, index) => {
            if (user.id === parseInt(id)) {
                usersData.users.splice(index, 1);
                fs.writeFileSync(
                    path.join(__dirname, "../data", "users.json"),
                    JSON.stringify(usersData, null, 4),
                    { encoding: "utf-8", flag: "w" }
                );
                return res.status(200).json({ message: "User deleted" });
            }
        });
        return res.status(404).json({ message: "User not found" });
    } catch (error) {
        throw new Error(error);
    }
};

// Update user by id
export const updateUser = (req, res) => {
    const { id } = req.params;
    const newUser = req.body;
    console.log(Object.keys(newUser).length);
    try {
        usersData.users.map((user, index) => {
            if (user.id === parseInt(id)) {
                if (Object.keys(newUser).length === 1) {
                    if (req.body.firstName) {
                        usersData.users[index].firstName = newUser.firstName;
                        fs.writeFileSync(
                            path.join(__dirname, "../data", "users.json"),
                            JSON.stringify(usersData, null, 4),
                            { encoding: "utf-8", flag: "w" }
                        );
                        return res.status(200).json(usersData.users[index]);
                    } else if (req.body.lastName) {
                        usersData.users[index].lastName = newUser.lastName;
                        fs.writeFileSync(
                            path.join(__dirname, "../data", "users.json"),
                            JSON.stringify(usersData, null, 4),
                            { encoding: "utf-8", flag: "w" }
                        );
                        return res.status(200).json(usersData.users[index]);
                    } else if (req.body.age) {
                        usersData.users[index].age = newUser.age;
                        fs.writeFileSync(
                            path.join(__dirname, "../data", "users.json"),
                            JSON.stringify(usersData, null, 4),
                            { encoding: "utf-8", flag: "w" }
                        );
                        return res.status(200).json(usersData.users[index]);
                    }
                } else if (Object.keys(newUser).length === 2) {
                    // update two values firstName and lastName
                    if (req.body.firstName && req.body.lastName) {
                        usersData.users[index].firstName = newUser.firstName;
                        usersData.users[index].lastName = newUser.lastName;
                        fs.writeFileSync(
                            path.join(__dirname, "../data", "users.json"),
                            JSON.stringify(usersData, null, 4),
                            { encoding: "utf-8", flag: "w" }
                        );
                        return res.status(200).json(usersData.users[index]);
                    }
                } else {
                    // update three values firstName, lastName and age
                    if (
                        req.body.firstName &&
                        req.body.lastName &&
                        req.body.age
                    ) {
                        usersData.users[index].firstName = newUser.firstName;
                        usersData.users[index].lastName = newUser.lastName;
                        usersData.users[index].age = newUser.age;

                        fs.writeFileSync(
                            path.join(__dirname, "../data", "users.json"),
                            JSON.stringify(usersData, null, 4),
                            { encoding: "utf-8", flag: "w" }
                        );
                        return res.status(200).json(usersData.users[index]);
                    }
                }
            } else {
                return res
                    .status(404)
                    .json({ message: "User not found", status: 404 });
            }
        });
    } catch (error) {
        throw new Error(error);
    }
};
