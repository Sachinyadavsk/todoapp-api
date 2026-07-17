const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./database/db");
const taskRouters = require("./routes/task.routes");
const userRouters = require("./routes/user.routes");

require("dotenv").config();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRouters);
app.use("/api/users", userRouters);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});