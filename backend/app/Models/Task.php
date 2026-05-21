<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'type', 'priority', 'status',
        'attempts', 'output', 'error_message',
        'started_at', 'completed_at'
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function logs(): HasMany
    {
        return $this->hasMany(TaskLog::class);
    }

    public function addLog(string $action, ?string $message = null, array $metadata = []): TaskLog
    {
        return $this->logs()->create([
            'action' => $action,
            'message' => $message,
            'metadata' => $metadata
        ]);
    }
}