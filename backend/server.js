import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import searchRouter from './src/routes/search.route.js'
import supplierRoutes from './src/routes/supplier.route.js'
import inventoryRoutes from './src/routes/inventory.route.js'


const app = express();

const PORT = process.env.PORT || 4500;

app.use(express.json());
app.use(cors());

app.use("/search", searchRouter);
app.use("/supplier",  supplierRoutes);
app.use("/inventory", inventoryRoutes);


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
});