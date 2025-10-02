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

employeesRouter.post("/", (req, res) => {
  //This checks if no body was sent or if the body is not an object.
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ message: "Name is required" });
  }
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  //This find the highest current id in the employees array.
  const maxId = employees.length ? Math.max(...employees.map((e) => e.id)) : 0;
  //This assins a new id that is one higher than the current max.
  const newId = maxId + 1;
  const newEmployee = { id: newId, name };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

//switched all .send to .json for object/array response and consistency.

export default employeesRouter;
