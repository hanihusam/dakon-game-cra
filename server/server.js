const path = require("path");
const express = require("express");
const app = express();

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "build", "index.html"))
  );
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is up!");
});
