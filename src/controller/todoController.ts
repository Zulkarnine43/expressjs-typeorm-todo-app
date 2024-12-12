import { Request, Response } from 'express';
import { AppDataSource } from '../ormconfig';
import { Todo } from '../entity/Todo';

const todoRepository = AppDataSource.getRepository(Todo);

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const todo = todoRepository.create({ title });
    await todoRepository.save(todo);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create todo', error });
  }
};

export const getTodos = async (_req: Request, res: Response) => {
  try {
    const todos = await todoRepository.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch todos', error });
  }
};

export const getTodoById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const todo = await todoRepository.findOneBy({ id: parseInt(id, 10) });
      if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
      }
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch todo', error });
    }
  };

  export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { title, completed } = req.body;
      const todo = await todoRepository.findOneBy({ id: parseInt(id, 10) });
      if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
      }
      todo.title = title ?? todo.title;
      todo.completed = completed ?? todo.completed;
  
      await todoRepository.save(todo);
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update todo', error });
    }
  };

  export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await todoRepository.delete({ id: parseInt(id, 10) });
      if (!result.affected) {
        res.status(404).json({ message: 'Todo not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete todo', error });
    }
  };