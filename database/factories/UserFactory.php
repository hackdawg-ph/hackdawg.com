<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\User;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    return [
        'gender' => ($gender = $faker->randomElement(['female', 'male'])),
        'website' => $faker->url,
        'about' => $faker->paragraph(5),
        'first_name' => $faker->firstName($gender),
        'last_name' => $faker->lastName,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'birthdate' => $faker->date(),
        'country' => $faker->countryCode,
        'state' => $faker->state,
        'city' => $faker->city,
        'street_address' => $faker->streetAddress,
        'postal_code' => $faker->postcode,
        'password' => Hash::make('password'),
        'remember_token' => Str::random(10),
    ];
});
