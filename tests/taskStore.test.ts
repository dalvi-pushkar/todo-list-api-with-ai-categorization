import { taskStore, Task } from '../src/lib/taskStore';

describe('TaskStore', () => {
  describe('create', () => {
    it('should create a new task with generated id', () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending' as const,
        category: 'work',
      };

      const task = taskStore.create(taskData);

      expect(task).toMatchObject(taskData);
      expect(task.id).toBeTruthy();
      expect(task.createdAt).toBeTruthy();
      expect(task.updatedAt).toBeTruthy();
    });

    it('should increment id for each new task', () => {
      const task1 = taskStore.create({
        title: 'Task 1',
        description: 'Description 1',
        status: 'pending',
      });

      const task2 = taskStore.create({
        title: 'Task 2',
        description: 'Description 2',
        status: 'completed',
      });

      expect(task1.id).not.toBe(task2.id);
    });
  });

  describe('getAll', () => {
    it('should return empty array when no tasks exist', () => {
      const tasks = taskStore.getAll();
      expect(tasks).toEqual([]);
    });

    it('should return all tasks', () => {
      taskStore.create({
        title: 'Task 1',
        description: 'Description 1',
        status: 'pending',
      });

      taskStore.create({
        title: 'Task 2',
        description: 'Description 2',
        status: 'completed',
      });

      const tasks = taskStore.getAll();
      expect(tasks).toHaveLength(2);
    });
  });

  describe('getById', () => {
    it('should return task by id', () => {
      const created = taskStore.create({
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending',
      });

      const found = taskStore.getById(created.id);
      expect(found).toEqual(created);
    });

    it('should return undefined for non-existent id', () => {
      const found = taskStore.getById('non-existent-id');
      expect(found).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update task fields', () => {
      const task = taskStore.create({
        title: 'Original Title',
        description: 'Original Description',
        status: 'pending',
      });

      const updated = taskStore.update(task.id, {
        title: 'Updated Title',
        status: 'completed',
      });

      expect(updated).toBeTruthy();
      expect(updated!.title).toBe('Updated Title');
      expect(updated!.status).toBe('completed');
      expect(updated!.description).toBe('Original Description');
      expect(updated!.updatedAt).not.toBe(task.updatedAt);
    });

    it('should return null for non-existent id', () => {
      const updated = taskStore.update('non-existent-id', {
        title: 'Updated Title',
      });

      expect(updated).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete task by id', () => {
      const task = taskStore.create({
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending',
      });

      const deleted = taskStore.delete(task.id);
      expect(deleted).toBe(true);

      const found = taskStore.getById(task.id);
      expect(found).toBeUndefined();
    });

    it('should return false for non-existent id', () => {
      const deleted = taskStore.delete('non-existent-id');
      expect(deleted).toBe(false);
    });
  });

  describe('clear', () => {
    it('should remove all tasks', () => {
      taskStore.create({
        title: 'Task 1',
        description: 'Description 1',
        status: 'pending',
      });

      taskStore.create({
        title: 'Task 2',
        description: 'Description 2',
        status: 'completed',
      });

      expect(taskStore.count()).toBe(2);

      taskStore.clear();

      expect(taskStore.count()).toBe(0);
      expect(taskStore.getAll()).toEqual([]);
    });
  });

  describe('count', () => {
    it('should return correct count of tasks', () => {
      expect(taskStore.count()).toBe(0);

      taskStore.create({
        title: 'Task 1',
        description: 'Description 1',
        status: 'pending',
      });

      expect(taskStore.count()).toBe(1);

      taskStore.create({
        title: 'Task 2',
        description: 'Description 2',
        status: 'completed',
      });

      expect(taskStore.count()).toBe(2);
    });
  });
});
