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

export const endpoints = (req, res) => {
    try {
        let routes = {
            baseUrl: "http://localhost:3000",
            availableEndpoints: [
                {
                    "/users": "GET - Get all users",
                    "/users/:id": [
                        "GET - Get user by id",
                        "POST - Create new user",
                        "PUT - Update user by id",
                        "DELETE - Delete user by id",
                    ],
                },
            ],
        };

        return res.status(200).json(routes);
    } catch (error) {
        throw new error(error);
    }
};
