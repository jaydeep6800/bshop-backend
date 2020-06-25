// import required Dependencies
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
const path = require('path')

// import Routes file
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const braintreeRoutes = require("./routes/braintree");
const botRoutes = require("./routes/bot");

// app
const app = express();

// DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database connected"));

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

// routes middleware
app.use("/api/auth", authRoutes);
app.use("/api/secret", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/braintree", braintreeRoutes);
app.use("/api/chatbot", botRoutes);

// init port value from env
const port = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production') {
  app.use(express.static( 'frontend/build' ))

  app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'frontend','build','index.html')) // relative path
  })
  

}

// run server on port
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
