const express = require("express");
const app = express();
require("dotenv").config(); // call the config() method to load the environment variables from the .env file:
app.use(express.json());

const authRouter = require("./routes/auth.routes");
app.use('/auth',authRouter);

app.listen(process.env.PORT, (err) => {
    if (err) console.log(err);
    console.log("Server is running on port ", process.env.PORT);
    require("./configs/db.config")
});