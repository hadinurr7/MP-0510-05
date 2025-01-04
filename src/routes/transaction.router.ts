import express from "express";
import { getTransactionsController } from "../controllers/transaction.controller";

const router = express.Router();

router.get("/", getTransactionsController);

export default router;
