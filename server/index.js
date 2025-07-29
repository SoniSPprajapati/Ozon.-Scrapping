const express = require("express");
const cors = require("cors");
const ozonRoutes = require("./routes/ozonRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/ozon", ozonRoutes);

app.get("/", (req, res) => res.send("Ozon Scraper Backend Running"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
