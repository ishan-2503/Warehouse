import express, {Request, Response} from "express";
import locationRoute from "./api/location/location";
import authRoute from "./api/auth/auth"

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/location", locationRoute);
app.use("/auth", authRoute)



app.listen(5000, () => {
    console.log("App is listening on port 5000");
})