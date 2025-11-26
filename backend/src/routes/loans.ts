import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { applyForLoan, getMyLoanApplications } from "../services/loanService";

export const loansRouter = Router();

loansRouter.post("/apply", authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { principal, tenureMonths, income } = req.body;

    if (
      principal === undefined ||
      tenureMonths === undefined ||
      income === undefined
    ) {
      return res.status(400).json({
        error: "principal, tenureMonths and income are required",
      });
    }

    const principalNum = Number(principal);
    const tenureNum = Number(tenureMonths);
    const incomeNum = Number(income);

    if (
      !Number.isFinite(principalNum) ||
      !Number.isFinite(tenureNum) ||
      !Number.isFinite(incomeNum) ||
      principalNum <= 0 ||
      tenureNum <= 0 ||
      incomeNum <= 0
    ) {
      return res.status(400).json({
        error: "principal, tenureMonths and income must be positive numbers",
      });
    }

    const application = await applyForLoan({
      userId: req.user.id,
      principal: principalNum,
      tenureMonths: tenureNum,
      income: incomeNum,
    });

    res.status(201).json(application);
  } catch (err) {
    next(err);
  }
});

loansRouter.get(
  "/my-applications",
  authMiddleware,
  async (req: AuthRequest, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const applications = await getMyLoanApplications(req.user.id);
      res.json(applications);
    } catch (err) {
      next(err);
    }
  }
);


