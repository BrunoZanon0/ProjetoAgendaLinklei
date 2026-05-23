<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        if (!User::where('email', 'admin@example.com')->exists()) {
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => Hash::make('12345678'),
            ]);
            $this->command->info('✅ Usuário admin criado!');
        } else {
            $this->command->info('ℹ️ Usuário admin já existe, ignorando...');
        }

        if (!User::where('email', 'test@example.com')->exists()) {
            User::create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => Hash::make('12345678'),
            ]);
            $this->command->info('✅ Usuário test criado!');
        } else {
            $this->command->info('ℹ️ Usuário test já existe, ignorando...');
        }
    }
}
