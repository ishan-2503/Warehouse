"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../../../db");
const router = express_1.default.Router();
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const queryParams = req.query;
    try {
        const query = { godown_id: id };
        const filterConditions = [];
        for (const [key, value] of Object.entries(queryParams)) {
            if (value) {
                filterConditions.push({
                    [key]: {
                        "$regex": value,
                        "options": "i"
                    }
                });
            }
        }
        if (filterConditions.length > 0) {
            query.$and = filterConditions;
        }
        const items = yield db_1.Item.find(query);
        // console.log(items);
        res.json({
            Items: items.map((item) => ({
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
        });
    }
    catch (err) {
        console.log("Error in item route: " + err);
        res.json({
            message: "This godown have no items."
        });
    }
}));
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
exports.default = router;
