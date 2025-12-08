// In-memory data store for tasks
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  category?: string;
  createdAt: string;
  updatedAt: string;
}

class TaskStore {
  private tasks: Map<string, Task> = new Map();
  private idCounter: number = 1;

  // Generate unique ID
  generateId(): string {
    return `task_${this.idCounter++}`;
  }

  // Create a new task
  create(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const id = this.generateId();
    const now = new Date().toISOString();
    const task: Task = {
      id,
      ...taskData,
      createdAt: now,
      updatedAt: now,
    };
    this.tasks.set(id, task);
    return task;
  }

  // Get all tasks
  getAll(): Task[] {
    return Array.from(this.tasks.values());
  }

  // Get a single task by ID
  getById(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  // Update a task
  update(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null {
    const task = this.tasks.get(id);
    if (!task) {
      return null;
    }
    const updatedTask: Task = {
      ...task,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  // Delete a task
  delete(id: string): boolean {
    return this.tasks.delete(id);
  }

  // Clear all tasks (useful for testing)
  clear(): void {
    this.tasks.clear();
    this.idCounter = 1;
  }

  // Get tasks count
  count(): number {
    return this.tasks.size;
  }
}

// Export a singleton instance
export const taskStore = new TaskStore();
