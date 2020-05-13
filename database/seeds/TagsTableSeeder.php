<?php

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tag::create(['name' => 'php']);
        Tag::create(['name' => 'laravel']);
        Tag::create(['name' => 'sql']);
        Tag::create(['name' => 'mysql']);
        Tag::create(['name' => 'postgresql']);
        Tag::create(['name' => 'nosql']);
        Tag::create(['name' => 'mongodb']);
        Tag::create(['name' => 'javascript']);
        Tag::create(['name' => 'reactjs']);
        Tag::create(['name' => 'alpinejs']);
        Tag::create(['name' => 'tailwindcss']);
        Tag::create(['name' => 'devops']);
        Tag::create(['name' => 'ci']);
        Tag::create(['name' => 'tdd']);
        Tag::create(['name' => 'ddd']);
        Tag::create(['name' => 'oop']);
        Tag::create(['name' => 'dry']);
        Tag::create(['name' => 'solid']);
    }
}
