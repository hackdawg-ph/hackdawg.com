<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = $this->signIn();
});

it('shows a listing of users', function () {
    $this->get(route('backend.users.index'))
        ->assertOk()
        ->assertSee('Users\/List');
});

it('can create a user', function () {
    $this->get(route('backend.users.create'))
        ->assertOk()
        ->assertSee('Users\/Create');

    $data = [
        'first_name' => faker()->firstName(),
        'last_name' => faker()->lastName,
        'email' => faker()->email,
        'country' => faker()->country,
        'state' => faker()->state,
        'city' => faker()->city,
        'street_address' => faker()->streetAddress,
        'postal_code' => faker()->postcode,
    ];

    $this->post(route('backend.users.store'), $data)->assertRedirect();

    $this->assertDatabaseHas('users', $data);
});

it('can update a user', function () {
    $this->get(route('backend.users.edit', $this->user))
        ->assertOk()
        ->assertSee('Users\/Edit');

    $data = [
        'first_name' => $this->user->first_name,
        'last_name' => faker()->lastName,
        'email' => $this->user->email,
    ];

    $this->patch(route('backend.users.update', $this->user), $data)
        ->assertRedirect();

    $this->assertDatabaseHas('users', $data);
});

it('can delete a user', function () {
    $this->delete(route('backend.users.destroy', ($user = User::first())))
        ->assertRedirect();

    $this->assertDatabaseMissing('users', [
        'email' => $user->email,
        'deleted_at' => null,
    ]);
});
