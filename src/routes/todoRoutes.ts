import { Router } from 'express';
import {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
} from '../controller/todoController';

const router = Router();

router.post('/', createTodo);
router.get('/', getTodos);
router.get('/:id', getTodoById);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;