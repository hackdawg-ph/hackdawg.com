<?php

namespace Tests\Feature;

use App\Mail\MessageSent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function it_sends_the_message()
    {
        $data = [
            'name' => $this->faker->name,
            'email' => $this->faker->companyEmail,
            'message' => $this->faker->paragraph(5),
        ];

        Mail::fake();

        $this->post(route('contact'), $data)
            ->assertRedirect()
            ->assertSessionHas('message', [
                'title' => 'Message sent!',
                'body' => "We'll try to get back to you as soon as possible.",
                'type' => 'success',
            ]);

        Mail::assertQueued(MessageSent::class);
    }
}
