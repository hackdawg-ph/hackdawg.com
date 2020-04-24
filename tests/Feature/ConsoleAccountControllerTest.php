<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ConsoleAccountControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function it_shows_the_account_page()
    {
        $user = factory(User::class)->create();

        $this->actingAs($user)
            ->get(route('console.account.index'))
            ->assertOk()
            ->assertSee('Account');
    }

    /** @test */
    public function it_can_update_the_profile_information()
    {
        Storage::fake('avatars');

        $user = factory(User::class)->create();
        $file = UploadedFile::fake()->image('avatar.jpg');

        $data = [
            'website' => $user->website,
            'about' => $this->faker->sentence(5),
            'avatar' => $file,
            'email' => $user->email,
        ];

        $this->actingAs($user)
            ->post(route('console.account.profile'), $data)
            ->assertRedirect();

        unset($data['avatar']);

        $this->assertDatabaseHas('users', $data);
        $this->assertDatabaseHas('media', [
            'model_type' => User::class,
            'model_id' => $user->id,
            'collection_name' => 'avatars',
            'file_name' => 'avatar.jpg',
        ]);
    }

    /** @test */
    public function it_can_update_the_personal_information()
    {
        $user = factory(User::class)->create();

        $data = [
            'first_name' => $this->faker->firstName($user->gender),
            'last_name' => $this->faker->lastName,
            'email' => $user->email,
            'country' => $this->faker->country,
            'state' => $this->faker->state,
            'city' => $this->faker->city,
            'street_address' => $this->faker->streetAddress,
            'postal_code' => $this->faker->postcode,
        ];

        $this->actingAs($user)
            ->post(route('console.account.personal'), $data)
            ->assertRedirect();

        $this->assertDatabaseHas('users', $data);
    }
}
