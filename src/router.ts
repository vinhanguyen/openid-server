import { Router } from "express";

export const router = Router();

router.get('/user', ({user}, res) => {
  res.json(user);
});
