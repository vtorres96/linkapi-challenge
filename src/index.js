const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./routes");

require("dotenv").config();

const app = express();
const server = require("http").Server(app);

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bfkrt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta: ${process.env.PORT}`);
});