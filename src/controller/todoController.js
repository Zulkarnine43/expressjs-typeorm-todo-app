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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodoById = exports.getTodos = exports.createTodo = void 0;
const ormconfig_1 = require("../ormconfig");
const Todo_1 = require("../entity/Todo");
const todoRepository = ormconfig_1.AppDataSource.getRepository(Todo_1.Todo);
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const todo = todoRepository.create({ title });
        yield todoRepository.save(todo);
        res.status(201).json(todo);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create todo', error });
    }
});
exports.createTodo = createTodo;
const getTodos = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todoRepository.find();
        res.status(200).json(todos);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch todos', error });
    }
});
exports.getTodos = getTodos;
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield todoRepository.findOneBy({ id: parseInt(id, 10) });
        if (!todo) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }
        res.status(200).json(todo);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch todo', error });
    }
});
exports.getTodoById = getTodoById;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const todo = yield todoRepository.findOneBy({ id: parseInt(id, 10) });
        if (!todo) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }
        todo.title = title !== null && title !== void 0 ? title : todo.title;
        todo.completed = completed !== null && completed !== void 0 ? completed : todo.completed;
        yield todoRepository.save(todo);
        res.status(200).json(todo);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update todo', error });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield todoRepository.delete({ id: parseInt(id, 10) });
        if (!result.affected) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete todo', error });
    }
});
exports.deleteTodo = deleteTodo;
