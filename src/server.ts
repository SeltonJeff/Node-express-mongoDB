import { config } from "dotenv";
config();
import app from "./app";

app.listen(8082, () => console.log("|=> Server is up!"));
