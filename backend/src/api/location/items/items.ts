import express, {Request, Response} from "express";
import { Item } from "../../../db";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const queryParams = req.query;

    try {
        const query: any = { godown_id: id }
        const filterConditions: any = [];
        for (const [key, value] of Object.entries(queryParams)){
            if (value) {
                filterConditions.push({
                    [key]: {
                        "$regex": value,
                        "options": "i"
                    }
                })
            }
        }

        if (filterConditions.length>0){
            query.$and = filterConditions
        }

        const items = await Item.find(query);
        // console.log(items);
        res.json({
            Items: items.map((item)=>({
                id: item.item_id,
                name: item.name,
                quantity: item.quantity,
                category: item.category,
                price: item.price,
                status: item.status,
                godown_id: item.godown_id,
                brand: item.brand,
                attributes: item.attributes,
                image_url: item.image_url
            }))
        })
    } catch (err) {
        console.log("Error in item route: " + err);
        res.json({
            message: "This godown have no items."   
        })
    }
});

// router.get("/:id", async (req: Request, res: Response) => {
//     const id = req.params.id;
//     const { name, category, brand } = req.query;

//     try {
//         const items = await Item.find(
//             {
//                 godown_id: id,
//                 $or: [
//                     {
//                         name: { "$regex":name, "$options":"i" },
//                         category: { "$regex":category, "options":"i" },
//                         brand: { "$regex": brand, "options":"i" }
//                     }
//                 ]
//             }
//         )
//         console.log(items);
//         res.json({
//             Items: items.map((item)=>({
//                 id: item.item_id,
//                 name: item.name,
//                 quantity: item.quantity,
//                 category: item.category,
//                 price: item.price,
//                 status: item.status,
//                 godown_id: item.godown_id,
//                 brand: item.brand,
//                 attributes: item.attributes,
//                 image_url: item.image_url
//             }))
//         })
//     } catch (err) {
//         console.log("Error in item route: " + err);
//         res.json({
//             message: "This godown have no items."   
//         })
//     }
// });

export default router;