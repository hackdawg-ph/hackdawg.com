<?php

namespace Tests\Feature;

use App\Http\Livewire\ContactForm;
use App\Models\User;
use App\Notifications\MessageSent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Notification;
use Livewire\Livewire;
use Tests\TestCase;

class ContactFormTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function it_sends_the_message()
    {
        $user = factory(User::class)
            ->create(['email' => 'hello@hackdawg.com']);

        Notification::fake();

        Livewire::test(ContactForm::class)
            ->set('name', $this->faker->name)
            ->set('email', $this->faker->companyEmail)
            ->set('message', $this->faker->paragraph(5))
            ->call('submit');

        Notification::assertSentTo($user, MessageSent::class);
    }

    /** @test */
    public function name_is_required()
    {
        Livewire::test(ContactForm::class)
            ->set('name', '')
            ->call('submit')
            ->assertHasErrors(['name' => 'required']);
    }

    /** @test */
    public function email_is_required()
    {
        Livewire::test(ContactForm::class)
            ->set('email', '')
            ->call('submit')
            ->assertHasErrors(['email' => 'required']);
    }

    /** @test */
    public function email_is_valid()
    {
        Livewire::test(ContactForm::class)
            ->set('email', $this->faker->word)
            ->call('submit')
            ->assertHasErrors(['email' => 'email']);
    }

    /** @test */
    public function message_is_required()
    {
        Livewire::test(ContactForm::class)
            ->set('message', '')
            ->call('submit')
            ->assertHasErrors(['message' => 'required']);
    }
}
