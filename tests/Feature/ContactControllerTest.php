<?php

namespace Tests\Feature;

use App\Models\User;
use App\Notifications\MessageSent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class ContactControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function it_sends_the_message()
    {
        $user = factory(User::class)
            ->create(['email' => 'hello@hackdawg.com']);

        $data = [
            'name' => $this->faker->name,
            'email' => $this->faker->companyEmail,
            'message' => $this->faker->paragraph(5),
        ];

        Notification::fake();

        $this->post(route('contact'), $data)
            ->assertRedirect()
            ->assertSessionHas('message', [
                'title' => 'Message sent!',
                'body' => "We'll try to get back to you as soon as possible.",
                'type' => 'success',
            ]);

        Notification::assertSentTo($user, MessageSent::class);
    }
}
