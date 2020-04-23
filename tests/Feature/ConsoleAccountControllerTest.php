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
            ->get(route('console.account'))
            ->assertOk()
            ->assertSee('Account');
    }

    /** @test */
    public function it_can_update_the_account_information()
    {        
        Storage::fake('avatars');

        $user = factory(User::class)->create();
        $file = UploadedFile::fake()->image('avatar.jpg');

        $data = [
            'username' => $user->username,
            'about' => $this->faker->sentence(5),
            'avatar' => $file,
            'name' => $this->faker->name,
            'email' => $user->email,
        ];
        
        $this->actingAs($user)
            ->post(route('console.account'), $data)
            ->assertRedirect();

        unset($data['avatar']);

        $this->assertDatabaseHas('users', $data);
        $this->assertDatabaseHas('media', [
            'model_type' => User::class,
            'model_id' => $user->id,
            'collection_name' => 'avatars',
            'file_name' => 'avatar.jpg'
        ]);
    }
}
