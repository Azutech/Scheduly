import { Router } from "express";
import { query } from "../controllers/query";

export const search = Router()

search.post('/search===%query', query)