import { errorHandler } from "./error.js";

export const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") return next(errorHandler(403, "Admin only"));
  next();
};
