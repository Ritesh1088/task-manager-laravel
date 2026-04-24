<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Http;

class TaskController extends Controller
{
    // 🔹 Create Task (Only Admin)
    public function store(Request $req)
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json([
                'status' => false,
                'message' => 'Only admin can create tasks'
            ], 403);
        }

        $req->validate([
            'title' => 'required|string|max:255',
            'priority' => 'required|in:LOW,MEDIUM,HIGH',
            'due_date' => 'required|date',
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'required|exists:users,id'
        ]);

        $task = Task::create([
            'title' => $req->title,
            'description' => $req->description,
            'priority' => $req->priority,
            'due_date' => $req->due_date,
            'project_id' => $req->project_id,
            'assigned_to' => $req->assigned_to,
            'status' => 'PENDING'
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Task created successfully',
            'data' => $task
        ]);
    }

    // 🔹 Get Logged-in User Tasks (with Django overdue sync)
    public function myTasks()
    {
        // 👉 Call Django API silently
        try {
            Http::timeout(2)->get('http://127.0.0.1:8001/api/check-overdue/');
        } catch (\Exception $e) {
            // ignore failure (important for interview)
        }

        $tasks = Task::where('assigned_to', auth()->id())
                    ->orderBy('due_date', 'asc')
                    ->get();

        return response()->json([
            'status' => true,
            'data' => $tasks
        ]);
    }

    // 🔹 Update Task Status (with business rules)
    public function update(Request $req, $id)
    {
        $req->validate([
            'status' => 'required|in:PENDING,IN_PROGRESS,DONE'
        ]);

        $task = Task::findOrFail($id);

        // ❌ Rule: User can only update their own task
        if (auth()->user()->role !== 'admin' && $task->assigned_to != auth()->id()) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        // ❌ Rule 1: OVERDUE → IN_PROGRESS not allowed
        if ($task->status === 'OVERDUE' && $req->status === 'IN_PROGRESS') {
            return response()->json([
                'status' => false,
                'message' => 'Overdue task cannot move back to IN_PROGRESS'
            ], 400);
        }

        // ❌ Rule 2: Only Admin can mark overdue → DONE
        if ($task->status === 'OVERDUE' && $req->status === 'DONE' && auth()->user()->role !== 'admin') {
            return response()->json([
                'status' => false,
                'message' => 'Only admin can close overdue tasks'
            ], 403);
        }

        // ✅ Update status only
        $task->update([
            'status' => $req->status
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Task updated successfully',
            'data' => $task
        ]);
    }

    // 🔹 Manual Django Trigger (Optional API)
    public function checkOverdue()
    {
        try {
            Http::timeout(2)->get('http://127.0.0.1:8001/api/check-overdue/');
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Django service not reachable'
            ], 500);
        }

        return response()->json([
            'status' => true,
            'message' => 'Overdue tasks synced successfully'
        ]);
    }
}