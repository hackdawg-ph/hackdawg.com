<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ConsoleAccountControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function it_shows_the_account_page()
    {
        $user = factory(User::class)->create();

        $this->actingAs($user)
            ->get(route('console.account'))
            ->assertOk()
            ->assertSee('Account');
    }

    /** @test */
    public function it_can_update_the_account_information()
    {
        $user = factory(User::class)->create();

        $data = [
            'username' => $user->username,
            'about' => $this->faker->sentence(5),
            'name' => $this->faker->name,
            'email' => $user->email,
        ];
        
        $this->actingAs($user)
            ->patch(route('console.account'), $data)
            ->assertRedirect();

        $this->assertDatabaseHas('users', $data);
    }
}
