import { NextRequest } from 'next/server';
import { GET as getTasks, POST as createTask } from '../src/app/api/tasks/route';
import {
  GET as getTask,
  PUT as updateTask,
  DELETE as deleteTask,
} from '../src/app/api/tasks/[id]/route';
import { taskStore } from '../src/lib/taskStore';

// Helper to create NextRequest
function createMockRequest(method: string, body?: any): NextRequest {
  const url = 'http://localhost:3000/api/tasks';
  return new NextRequest(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Helper to create route context
function createContext(id: string) {
  return {
    params: Promise.resolve({ id }),
  };
}

describe('Tasks API', () => {
  describe('GET /api/tasks', () => {
    it('should return empty array when no tasks exist', async () => {
      const response = await getTasks();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual([]);
      expect(data.count).toBe(0);
    });

    it('should return all tasks', async () => {
      // Create test tasks
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

      const response = await getTasks();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(2);
      expect(data.count).toBe(2);
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'New Task',
        description: 'Task description',
        status: 'pending',
        category: 'work',
      };

      const request = createMockRequest('POST', taskData);
      const response = await createTask(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data).toMatchObject(taskData);
      expect(data.data.id).toBeTruthy();
      expect(data.data.createdAt).toBeTruthy();
    });

    it('should auto-categorize task if category not provided', async () => {
      const taskData = {
        title: 'Team Meeting',
        description: 'Prepare presentation for client meeting',
      };

      const request = createMockRequest('POST', taskData);
      const response = await createTask(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.category).toBeTruthy();
    });

    it('should validate required title field', async () => {
      const taskData = {
        description: 'Task description',
      };

      const request = createMockRequest('POST', taskData);
      const response = await createTask(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Title');
    });

    it('should validate required description field', async () => {
      const taskData = {
        title: 'New Task',
      };

      const request = createMockRequest('POST', taskData);
      const response = await createTask(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Description');
    });

    it('should validate status field', async () => {
      const taskData = {
        title: 'New Task',
        description: 'Task description',
        status: 'invalid-status',
      };

      const request = createMockRequest('POST', taskData);
      const response = await createTask(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Status');
    });

    it('should default to pending status', async () => {
      const taskData = {
        title: 'New Task',
        description: 'Task description',
      };

      const request = createMockRequest('POST', taskData);
      const response = await createTask(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.data.status).toBe('pending');
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return task by id', async () => {
      const task = taskStore.create({
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending',
      });

      const request = createMockRequest('GET');
      const context = createContext(task.id);
      const response = await getTask(request, context);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual(task);
    });

    it('should return 404 for non-existent task', async () => {
      const request = createMockRequest('GET');
      const context = createContext('non-existent-id');
      const response = await getTask(request, context);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toContain('not found');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update task', async () => {
      const task = taskStore.create({
        title: 'Original Title',
        description: 'Original Description',
        status: 'pending',
      });

      const updates = {
        title: 'Updated Title',
        status: 'completed',
      };

      const request = createMockRequest('PUT', updates);
      const context = createContext(task.id);
      const response = await updateTask(request, context);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.title).toBe('Updated Title');
      expect(data.data.status).toBe('completed');
      expect(data.data.description).toBe('Original Description');
    });

    it('should return 404 for non-existent task', async () => {
      const updates = {
        title: 'Updated Title',
      };

      const request = createMockRequest('PUT', updates);
      const context = createContext('non-existent-id');
      const response = await updateTask(request, context);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
    });

    it('should validate status field on update', async () => {
      const task = taskStore.create({
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending',
      });

      const updates = {
        status: 'invalid-status',
      };

      const request = createMockRequest('PUT', updates);
      const context = createContext(task.id);
      const response = await updateTask(request, context);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Status');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete task', async () => {
      const task = taskStore.create({
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending',
      });

      const request = createMockRequest('DELETE');
      const context = createContext(task.id);
      const response = await deleteTask(request, context);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);

      const found = taskStore.getById(task.id);
      expect(found).toBeUndefined();
    });

    it('should return 404 for non-existent task', async () => {
      const request = createMockRequest('DELETE');
      const context = createContext('non-existent-id');
      const response = await deleteTask(request, context);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
    });
  });
});
