<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Celebrity>
 */
class CelebrityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'net_worth' => $this->faker->randomNumber(7),
            'gender' => $this->faker->randomElement(['Male', 'Female']),
            'nationality' => $this->faker->country,
            'height' => $this->faker->numberBetween(150, 200),
            'birthday' => $this->faker->date,
            'age' => $this->faker->numberBetween(20, 80),
            'is_alive' => $this->faker->randomElement([true, false]),
        ];
    }
}
