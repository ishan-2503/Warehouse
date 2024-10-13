import express, {Request, Response} from "express";
// import mongoose from "mongoose";
import { Location } from "../../db"
import itemRouter from "./items/items"

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const filter = req.query.filter || "";
   try {
    const godowns = await Location.find({
        $and: [{
            name: {
                "$regex": filter,
                "$options": "i"
            }
        }, {
            parent_godown: null,
        }]
    });
    res.json({
        locations: godowns.map((godown: any)=>({
            id: godown.id,
            name: godown.name,
            parent_godown: godown.parent_godown
        }))
    })
   } catch (err) {
    console.log("Error in location get route: " + err);
    res.json({
        message: "Location Not Found"
    })
   }
});

router.get("/godown/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const filter = req.query.filter || "";
    try {
        const godowns = await Location.find({
            $and: [{
                parent_godown: id
            }, {
                name: {
                    "$regex": filter,
                    "$options": "i"
                }
            }]
        })
        res.json({
            Sublocations: godowns.map((godown: any) => ({
                id: godown.id,
                name: godown.name,
                parent_godown: godown.parent_godown
            }))
        })
    } catch (err) {
        console.log("Error in location/godown route: " + err);
        res.json({
            message: "This location contains no godowns."
        })
    }
})

router.use("/godown/:id/items", itemRouter);

export default router;