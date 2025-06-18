<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([RoleSeeder::class]);

        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@email.com',
        ]);

        $admin->roles()->attach(Role::where('slug', UserRole::ADMIN)->first()->id);

        // Crear usuarios clientes
        User::factory(3)->create()->each(function ($user) {
            $user->roles()->attach(Role::where('slug', UserRole::CLIENT)->first()->id);
        });

        // Crear categorías
        Category::factory(5)->create();

        // Crear autores
        Author::factory(10)->create();

        // Crear libros
        Book::factory(20)->create([
            'author_id' => fn() => Author::inRandomOrder()->first()->id,
            'category_id' => fn() => Category::inRandomOrder()->first()->id,
        ]);
    }
}
