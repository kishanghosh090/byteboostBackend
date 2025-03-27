import app from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT || 5000;


app.listen(process.env.PORT || 5000, () =>
  console.log("🚀 Server running on port", process.env.PORT || 5000)
);
