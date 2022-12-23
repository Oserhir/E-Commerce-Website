// Require the NPM packages that we need
const path = require("path");

const express = require("express");
const app = express();
require("dotenv").config(); // access environment variables

const db = require("./config/database"); // Connect to Database
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const APIError = require("./utils/APIError");
const globalError = require("./middlewares/errorMiddleware");

// Routes
const authRouters = require("./router/auth");
const userRouters = require("./router/user");
const categoryRouters = require("./router/category");
const productRouters = require("./router/products");
const subCategoryRouters = require("./router/subcategory");
const brandRouters = require("./router/brand");
const reviewRouters = require("./router/review");
const wishlistRouters = require("./router/wishlist");
const addressessRouters = require("./router/address");
const couponRouters = require("./router/coupon");
const cartRouters = require("./router/cart");
const orderRouters = require("./router/order");

// Middleware
app.use(bodyParser.json()); // This allows us to pass data from the form
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Static File
app.use(express.static(path.join(__dirname, "uploads")));

//Parse Cookie header
app.use(cookieParser());

// Routes Middlware
app.use("/api", authRouters);
app.use("/api/users", userRouters);
app.use("/api/category", categoryRouters);
app.use("/api/products", productRouters);
app.use("/api/subcategories", subCategoryRouters);
app.use("/api/brand", brandRouters);
app.use("/api/reviews", reviewRouters);
app.use("/api/wishlist", wishlistRouters);
app.use("/api/addressess", addressessRouters);
app.use("/api/coupons", couponRouters);
app.use("/api/cart", cartRouters);
app.use("/api/orders", orderRouters);

// Handle Unhandled Routes
app.all("*", (req, res, next) => {
  next(new APIError(`Can't find this route ${req.originalUrl}`, 400));
});

// Global handling middlware
app.use(globalError);

const PORT = process.env.PORT || 3000; // Set a default environment port or cutom port - 3000

// Start out application
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
