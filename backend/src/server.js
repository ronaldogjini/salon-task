const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const retentionRoutes = require("./routes/retentionRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});

app.use("/retention", retentionRoutes);