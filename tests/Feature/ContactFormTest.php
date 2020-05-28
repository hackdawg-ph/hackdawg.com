<?php

use App\Http\Livewire\ContactForm;
use App\Models\User;
use App\Notifications\MessageSent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Livewire\Livewire;

uses(RefreshDatabase::class);

it('sends the message', function () {
    $user = factory(User::class)->create(['email' => 'hello@hackdawg.com']);

    Notification::fake();

    Livewire::test(ContactForm::class)
        ->set('name', faker()->name)
        ->set('email', faker()->companyEmail)
        ->set('message', faker()->paragraph(5))
        ->call('submit');

    Notification::assertSentTo($user, MessageSent::class);
});

it('requires the name', function () {
    Livewire::test(ContactForm::class)
        ->set('name', '')
        ->call('submit')
        ->assertHasErrors(['name' => 'required']);
});

it('requires the email', function () {
    Livewire::test(ContactForm::class)
        ->set('email', '')
        ->call('submit')
        ->assertHasErrors(['email' => 'required']);
});

it('checks the email is valid', function () {
    Livewire::test(ContactForm::class)
        ->set('email', faker()->word)
        ->call('submit')
        ->assertHasErrors(['email' => 'email']);
});

it('requires the message', function () {
    Livewire::test(ContactForm::class)
        ->set('message', '')
        ->call('submit')
        ->assertHasErrors(['message' => 'required']);
});
