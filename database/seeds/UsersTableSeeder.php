<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'username' => 'leonardolouie30',
            'about' => 'FullStack Developer / Music Enthusiast / DevOps Engineer',
            'name' => 'Leonardo Ordonez',
            'email' => 'leonardolouie30@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);

        User::create([
            'username' => 'ahgumasing',
            'about' => null,
            'name' => 'Abetteson Gumasing',
            'email' => 'ahgumasing@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);
        
        User::create([
            'username' => 'rancyguanzon',
            'about' => 'Brand / Graphic Design, UI / Visual Design, Product Design',
            'name' => 'Lourd Rancy Guanzon',
            'email' => 'lourdrancyguanzon@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);

        User::create([
            'username' => 'jovertical',
            'about' => 'Full Stack Developer | DevOps | Loves coffee',
            'name' => 'Jovert Palonpon',
            'email' => 'jovertical@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);
    }
}
