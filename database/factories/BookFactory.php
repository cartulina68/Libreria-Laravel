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
            'author_id' => 1,
            'category_id' => 1,
            'title' => fake()->words(3, true),
            'price_per_day' => fake()->randomFloat(2, 5, 50),
            'publication_year' => fake()->numberBetween(1900, date('Y')),
        ];
    }
}
