import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
import config from "./app/config";
dotenv.config();

async function main() {
  await mongoose.connect(config.database_url as string);
}
app.listen(config.port, () => {
  console.log(`Application is listening on port ${config.port}`);
});

main();
