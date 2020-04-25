<?php

use App\Models\User;
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
            'website' => 'https://leonardo-louie.me',
            'about' => 'FullStack Developer / Music Enthusiast / DevOps Engineer',
            'first_name' => 'Leonardo',
            'last_name' => 'Ordonez',
            'email' => 'leonardolouie30@gmail.com',
            'email_verified_at' => now(),
            'birthdate' => null,
            'gender' => 'male',
            'country' => null,
            'state' => null,
            'city' => null,
            'street_address' => null,
            'postal_code' => null,
            'password' => Hash::make('password'),
        ]);

        User::create([
            'website' => null,
            'about' => null,
            'first_name' => 'Abetteson',
            'last_name' => 'Gumasing',
            'email' => 'ahgumasing@gmail.com',
            'email_verified_at' => now(),
            'birthdate' => null,
            'gender' => 'male',
            'country' => null,
            'state' => null,
            'city' => null,
            'street_address' => null,
            'postal_code' => null,
            'password' => Hash::make('password'),
        ]);
        
        User::create([
            'website' => null,
            'about' => 'Brand / Graphic Design, UI / Visual Design, Product Design',
            'first_name' => 'Lourd Rancy',
            'last_name' => 'Guanzon',
            'email' => 'lourdrancyguanzon@gmail.com',
            'email_verified_at' => now(),
            'birthdate' => null,
            'gender' => 'male',
            'country' => null,
            'state' => null,
            'city' => null,
            'street_address' => null,
            'postal_code' => null,
            'password' => Hash::make('password'),
        ]);

        User::create([
            'website' => 'https://jovertpalonpon.me',
            'about' => 'Full Stack Developer | DevOps | Loves coffee',
            'first_name' => 'Jovert',
            'last_name' => 'Palonpon',
            'email' => 'jovertical@gmail.com',
            'email_verified_at' => now(),
            'birthdate' => '1998-05-18',
            'gender' => 'male',
            'country' => null,
            'state' => 'Bulacan',
            'city' => 'Angat',
            'street_address' => '776 Tugatog St. Marungko',
            'postal_code' => '3012',
            'password' => Hash::make('password'),
        ]);
    }
}
