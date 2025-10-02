import express from "express";
import employees from "../db/employees.js";

const employeesRouter = express.Router();

employeesRouter.get("/", (req, res) => {
  res.json(employees);
});

employeesRouter.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.json(employees[randomIndex]);
});

employeesRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json(employee);
});

//switched all .send to .json for object/array response and consistency.

export default employeesRouter;
