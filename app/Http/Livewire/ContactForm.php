<?php

namespace App\Http\Livewire;

use App\Models\User;
use App\Notifications\MessageSent;
use Livewire\Component;

class ContactForm extends Component
{
    public $name;
    public $email;
    public $message;

    public function submit()
    {
        $this->validate([
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required',
        ]);

        $user = User::where('email', 'hello@hackdawg.com')->firstOrFail();
        $user->notify(
            new MessageSent([
                'name' => $this->name,
                'email' => $this->email,
                'message' => $this->message,
            ])
        );

        session()->flash('message', 'Message successfully sent!');
    }

    public function render()
    {
        return view('livewire.contact-form');
    }
}
