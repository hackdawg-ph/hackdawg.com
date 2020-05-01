<?php

namespace Tests\Feature;

use App\Models\User;
use Auth;
use Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Storage;
use Tests\TestCase;

class BackendAccountControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function it_shows_the_account_page()
    {
        $this->signIn();

        $this->get(route('backend.account.index'))
            ->assertOk()
            ->assertSee('Account');
    }

    /** @test */
    public function it_can_update_the_profile_information()
    {
        Storage::fake('avatars');

        $user = $this->signIn();
        $file = UploadedFile::fake()->image('avatar.jpg');

        $data = [
            'website' => $user->website,
            'about' => $this->faker->sentence(5),
            'avatar' => $file,
            'email' => $user->email,
        ];

        $this->post(route('backend.account.profile'), $data)->assertRedirect();

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
        $user = $this->signIn();

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
            ->post(route('backend.account.personal'), $data)
            ->assertRedirect();

        $this->assertDatabaseHas('users', $data);
    }

    /** @test */
    public function it_can_update_the_password()
    {
        $user = $this->signIn();

        $data = [
            'old_password' => 'password',
            'new_password' => 'hackdawg',
        ];

        $this->actingAs($user)
            ->post(route('backend.account.password'), $data)
            ->assertRedirect();

        $this->assertTrue(Hash::check('hackdawg', Auth::user()->password));
    }
}
