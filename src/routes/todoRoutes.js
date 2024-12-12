"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoController_1 = require("../controller/todoController");
const router = (0, express_1.Router)();
router.post('/', todoController_1.createTodo);
router.get('/', todoController_1.getTodos);
router.get('/:id', todoController_1.getTodoById);
router.put('/:id', todoController_1.updateTodo);
router.delete('/:id', todoController_1.deleteTodo);
exports.default = router;
