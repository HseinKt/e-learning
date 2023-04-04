const express = require("express");
const cors =  require("cors");
const app = express();

require("dotenv").config(); // call the config() method to load the environment variables from the .env file:
app.use(express.json());

app.use(cors());
// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

const authRouter = require("./routes/auth.routes");
app.use('/auth',authRouter);

const classRouter = require("./routes/class.routes");
const { authMiddleware } = require("./middlewares/auth.middleware")
app.use("/class",authMiddleware,classRouter);

app.listen(process.env.PORT, (err) => {
    if (err) console.log(err);
    console.log("Server is running on port ", process.env.PORT);
    require("./configs/db.config")
});
