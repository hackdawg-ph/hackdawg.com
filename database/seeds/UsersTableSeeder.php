<?php

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superAdmin = Role::create(['name' => 'super admin']);
        $writer = Role::create(['name' => 'writer']);

        $createTags = Permission::create(['name' => 'create tags']);
        $editTags = Permission::create(['name' => 'edit tags']);
        $createArticles = Permission::create(['name' => 'create articles']);
        $editArticles = Permission::create(['name' => 'edit articles']);

        $writer->givePermissionTo($createTags);
        $writer->givePermissionTo($editTags);
        $writer->givePermissionTo($createArticles);
        $writer->givePermissionTo($editArticles);

        $leonardo = User::create([
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

        $leonardo->assignRole($superAdmin);

        $abette = User::create([
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

        $abette->assignRole($superAdmin);

        $rancy = User::create([
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

        $rancy->assignRole($superAdmin);

        $jovert = User::create([
            'website' => 'https://jovertpalonpon.me',
            'about' => 'Full Stack Developer | DevOps | Loves coffee',
            'first_name' => 'Jovert',
            'last_name' => 'Palonpon',
            'email' => 'jovertical@gmail.com',
            'email_verified_at' => now(),
            'birthdate' => '1998-05-18',
            'gender' => 'male',
            'country' => 'PH',
            'state' => 'Bulacan',
            'city' => 'Angat',
            'street_address' => '776 Tugatog St. Marungko',
            'postal_code' => '3012',
            'password' => Hash::make('password'),
        ]);

        $jovert->assignRole($superAdmin);

        $hackdawg = User::create([
            'website' => null,
            'about' => null,
            'first_name' => 'Juan',
            'last_name' => 'Dela Cruz',
            'email' => 'hello@hackdawg.com',
            'email_verified_at' => now(),
            'birthdate' => null,
            'gender' => 'male',
            'country' => 'PH',
            'state' => null,
            'city' => null,
            'street_address' => null,
            'postal_code' => null,
            'password' => Hash::make('password'),
        ]);

        $hackdawg->assignRole($superAdmin);
    }
}
