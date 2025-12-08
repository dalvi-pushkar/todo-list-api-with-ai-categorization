import { NextRequest, NextResponse } from 'next/server';
import { taskStore } from '@/lib/taskStore';

type RouteContext = {
  params: Promise<{ id: string }>;
};

// GET /api/tasks/:id - Get a single task
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const task = taskStore.getById(id);
    
    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch task' },
      { status: 500 }
    );
  }
}

// PUT /api/tasks/:id - Update a task
export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    
    // Validate status if provided
    if (body.status && !['pending', 'completed'].includes(body.status)) {
      return NextResponse.json(
        { success: false, error: 'Status must be either "pending" or "completed"' },
        { status: 400 }
      );
    }
    
    // Prepare updates
    const updates: any = {};
    if (body.title) updates.title = body.title.trim();
    if (body.description) updates.description = body.description.trim();
    if (body.status) updates.status = body.status;
    if (body.category) updates.category = body.category.trim();
    
    // Update task
    const updatedTask = taskStore.update(id, updates);
    
    if (!updatedTask) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: updatedTask,
      message: 'Task updated successfully',
    });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks/:id - Delete a task
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const deleted = taskStore.delete(id);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}
