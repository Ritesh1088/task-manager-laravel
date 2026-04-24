<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;

// 🔓 PUBLIC ROUTES
Route::post('/login',[AuthController::class,'login']);

// 🔥 TEMP PUBLIC (Testing ke liye)
Route::get('/check-overdue',[TaskController::class,'checkOverdue']);


// 🔐 PROTECTED ROUTES
Route::middleware('auth:sanctum')->group(function(){

    // Projects
    Route::get('/projects',[ProjectController::class,'index']);
    Route::post('/projects',[ProjectController::class,'store']);

    // Tasks
    Route::post('/tasks',[TaskController::class,'store']);
    Route::get('/my-tasks',[TaskController::class,'myTasks']);
    Route::put('/tasks/{id}',[TaskController::class,'update']);

    // Users list
    Route::get('/users', function(){
        return \App\Models\User::select('id','name')->get();
    });

});