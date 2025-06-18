<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'publication_year' => fake()->numberBetween(1900, date('Y')),
            'price_per_day' => fake()->randomFloat(2, 5, 50),
            'author_id' => 1,
            'category_id' => 1,
        ];
    }
}
