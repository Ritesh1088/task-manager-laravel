<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();

            $table->enum('status', [
                'PENDING',
                'IN_PROGRESS',
                'DONE',
                'OVERDUE'
            ])->default('PENDING');

            $table->enum('priority', [
                'LOW',
                'MEDIUM',
                'HIGH'
            ])->default('MEDIUM');

            $table->date('due_date');

            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->foreignId('assigned_to');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};