<?php

namespace Tests\Feature;

use App\Models\User;
use Auth;
use Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Storage;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = $this->signIn();
});

it('shows the account page', function () {
    $this->get(route('backend.account.index'))
        ->assertOk()
        ->assertSee('Account');
});

it('can update the profile information', function () {
    Storage::fake('avatars');

    $file = UploadedFile::fake()->image('avatar.jpg');

    $data = [
        'website' => $this->user->website,
        'about' => faker()->sentence(5),
        'avatar' => $file,
        'email' => $this->user->email,
    ];

    $this->post(route('backend.account.profile'), $data)->assertRedirect();

    unset($data['avatar']);

    $this->assertDatabaseHas('users', $data);
    $this->assertDatabaseHas('media', [
        'model_type' => User::class,
        'model_id' => $this->user->id,
        'collection_name' => 'avatars',
        'file_name' => 'avatar.jpg',
    ]);
});

it('can update the personal information', function () {
    $data = [
        'first_name' => faker()->firstName($this->user->gender),
        'last_name' => faker()->lastName,
        'email' => $this->user->email,
        'country' => faker()->country,
        'state' => faker()->state,
        'city' => faker()->city,
        'street_address' => faker()->streetAddress,
        'postal_code' => faker()->postcode,
    ];

    $this->post(route('backend.account.personal'), $data)->assertRedirect();
    $this->assertDatabaseHas('users', $data);
});

it('can update the password', function () {
    $data = [
        'old_password' => 'password',
        'new_password' => 'hackdawg',
    ];

    $this->post(route('backend.account.password'), $data)->assertRedirect();
    $this->assertTrue(Hash::check('hackdawg', Auth::user()->password));
});
