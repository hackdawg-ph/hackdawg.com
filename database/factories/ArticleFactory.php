<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Article;
use Faker\Generator as Faker;
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

$factory->define(Article::class, function (Faker $faker) {
    return [
        'user_id' => factory(\App\Models\User::class),
        'title' => ($title = $faker->sentence),
        'slug' => Str::slug($title),
        'body' => $faker->paragraph,
        'published_at' => $faker->dateTime()->format('Y-m-d H:i:s.u'),
    ];
});
