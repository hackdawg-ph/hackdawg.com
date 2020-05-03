<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BackendUsersControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test **/
    public function it_shows_a_listing_of_users()
    {
        $this->signIn();

        $this->get(route('backend.users.index'))
            ->assertOk()
            ->assertSee('Users\/List');
    }

    /** @test */
    public function it_can_create_a_user()
    {
        $this->signIn();

        $this->get(route('backend.users.create'))
            ->assertOk()
            ->assertSee('Users\/Create');

        $data = [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->email,
            'country' => $this->faker->country,
            'state' => $this->faker->state,
            'city' => $this->faker->city,
            'street_address' => $this->faker->streetAddress,
            'postal_code' => $this->faker->postcode,
        ];

        $this->post(route('backend.users.store'), $data)
            ->assertRedirect();

        $this->assertDatabaseHas('users', $data);
    }

    /** @test */
    public function it_can_update_a_user()
    {
        $user = $this->signIn();

        $this->get(route('backend.users.edit', $user))
            ->assertOk()
            ->assertSee('Users\/Edit');

        $data = [
            'first_name' => $user->first_name,
            'last_name' => $this->faker->lastName,
            'email' => $user->email,
        ];

        $this->patch(route('backend.users.update', $user), $data)
            ->assertRedirect();

        $this->assertDatabaseHas('users', $data);
    }

    /** @test */
    public function it_can_delete_a_user()
    {
        $this->signIn();

        $this->delete(route('backend.users.destroy', ($user = User::first())))
            ->assertRedirect();

        $this->assertDatabaseMissing('users', [
            'email' => $user->email,
            'deleted_at' => null,
        ]);
    }
}
