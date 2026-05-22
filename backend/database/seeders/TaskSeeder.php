<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\TaskLog;
use App\Jobs\ProcessTask;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        TaskLog::truncate();
        Task::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        $highPriorityTasks = [
            ['name' => ' Enviar newsletter urgente', 'type' => 'email', 'priority' => 'high'],
            ['name' => ' Gerar relatório de vendas urgente', 'type' => 'report', 'priority' => 'high'],
            ['name' => ' Processar fila de e-mails prioritários', 'type' => 'email', 'priority' => 'high'],
            ['name' => ' Gerar relatório de usuários ativos', 'type' => 'report', 'priority' => 'high'],
            ['name' => ' Enviar alerta de segurança', 'type' => 'email', 'priority' => 'high'],
        ];

        $defaultPriorityTasks = [
            ['name' => ' Enviar newsletter semanal', 'type' => 'email', 'priority' => 'default'],
            ['name' => ' Gerar relatório de performance', 'type' => 'report', 'priority' => 'default'],
            ['name' => ' Enviar notificação push', 'type' => 'email', 'priority' => 'default'],
            ['name' => ' Gerar relatório consolidado', 'type' => 'report', 'priority' => 'default'],
            ['name' => ' Enviar e-mail marketing', 'type' => 'email', 'priority' => 'default'],
        ];

        $this->command->info("📊 Criando tasks com prioridade ALTA...");
        
        foreach ($highPriorityTasks as $taskData) {
            $task = Task::create([
                'name' => $taskData['name'],
                'type' => $taskData['type'],
                'priority' => 'high',
                'status' => 'pending',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            ProcessTask::dispatch($task)->onQueue('high');
            $this->command->info("  ✅ HIGH: {$task->name}");
            
            usleep(500000);
        }

        $this->command->info("\n📊 Criando tasks com prioridade DEFAULT...");
        
        foreach ($defaultPriorityTasks as $taskData) {
            $task = Task::create([
                'name' => $taskData['name'],
                'type' => $taskData['type'],
                'priority' => 'default',
                'status' => 'pending',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            ProcessTask::dispatch($task)->onQueue('default');
            $this->command->info("  ✅ DEFAULT: {$task->name}");
            
            usleep(500000); // 0.5 segundos
        }

        $total = count($highPriorityTasks) + count($defaultPriorityTasks);
        $this->command->info("\n✅ $total tasks criadas!");
        $this->command->info("   - HIGH priority: " . count($highPriorityTasks));
        $this->command->info("   - DEFAULT priority: " . count($defaultPriorityTasks));
        $this->command->info("\n⏳ Workers vão processar na ordem: HIGH primeiro, depois DEFAULT");
    }
}
