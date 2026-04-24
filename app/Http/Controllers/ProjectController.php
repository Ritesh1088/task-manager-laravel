<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    // 🔹 Get all projects (with tasks)
    public function index()
    {
        $projects = Project::with('tasks')->latest()->get();

        return response()->json([
            'status' => true,
            'data' => $projects
        ]);
    }

    // 🔹 Create project (Admin only)
    public function store(Request $req)
    {
        // 🔐 Only admin allowed
        if (auth()->user()->role !== 'admin') {
            return response()->json([
                'status' => false,
                'message' => 'Only admin can create project'
            ], 403);
        }

        // ✅ Validation
        $req->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        // ✅ Create project
        $project = Project::create([
            'name' => $req->name,
            'description' => $req->description,
            'created_by' => auth()->id()
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Project created successfully',
            'data' => $project
        ]);
    }
}