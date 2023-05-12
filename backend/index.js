const express = require("express");
require("./db/config");
const User = require("./db/User");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

const Product = require("./db/Products");

app.use(express.json());
app.use(helmet());
app.use(cors());
app.post("/api/register", async (req, resp) => {
  let user = new User(req.body);
  let data = await user.save();
  data = data.toObject();
  delete data.password;
  // console.log(data);
  Jwt.sign({ data }, jwtKey, { expiresIn: "2h" }, (error, token) => {
    if (error) {
      resp.send({ result: "something went wrong try after sometime" });
    }
    resp.send({ data, auth: token });
  });
});

app.post("/api/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    console.log(req.body);
    let user = await User.findOne(req.body).select("-password");
    // let user = req.body;
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (error, token) => {
        if (error) {
          resp.send({ result: "something went wrong try after sometime" });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "no user found" });
    }
  } else {
    resp.send({ result: "send correct email and password" });
  }
});

app.post("/api/add-product", async (req, resp) => {
  let product = new Product(req.body);
  let data = await product.save();
  console.warn(data);
  resp.send(data);
});

app.get("/api/products", async (req, resp) => {
  const products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    [resp.send({ result: "no product found" })];
  }
});

app.delete("/api/product/:id", async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/api/product/:id", async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });

  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "product not found " });
  }
});

app.put("/api/product/:id", async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.get("/api/search/:key", verifyToken, async (req, resp) => {
  let result = await Product.find({
    $or: [
      {
        name: { $regex: req.params.key },
      },
      {
        company: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
    ],
  });
  resp.send(result);
});

function verifyToken(req, resp, next) {
  // console.log(req.headers["Authorization"]);
  next();
}
app.listen(5000);
