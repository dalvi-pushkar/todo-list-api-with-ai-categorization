import { NextRequest, NextResponse } from 'next/server';
import { taskStore, Task } from '@/lib/taskStore';
import { categorizeTask } from '@/lib/aiCategorization';

// GET /api/tasks - Get all tasks
export async function GET() {
  try {
    const tasks = taskStore.getAll();
    return NextResponse.json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || typeof body.title !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Title is required and must be a string' },
        { status: 400 }
      );
    }
    
    if (!body.description || typeof body.description !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Description is required and must be a string' },
        { status: 400 }
      );
    }
    
    // Validate status if provided
    const status = body.status || 'pending';
    if (!['pending', 'completed'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Status must be either "pending" or "completed"' },
        { status: 400 }
      );
    }
    
    // AI categorization
    let category = body.category;
    if (!category) {
      try {
        category = await categorizeTask(body.description, body.title);
      } catch (error) {
        console.error('Categorization error:', error);
        category = 'general';
      }
    }
    
    // Create task
    const task = taskStore.create({
      title: body.title.trim(),
      description: body.description.trim(),
      status,
      category,
    });
    
    return NextResponse.json(
      {
        success: true,
        data: task,
        message: 'Task created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
