import express from "express";

// routes
import usersRoutes from "./routes/users.js";
import indexRoutes from "./routes/index.js";

const app = express();

//catch 404 and forwad to error handles

const PORT = 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", indexRoutes);
app.use("/users", usersRoutes);

app.use("*", (req, res) => {
    res.status(404).json({ message: "Not found", status: 404 });
});
// start server
app.listen(PORT, () =>
    console.log(`Server is Running on port: http://localhost:${PORT}`)
);
