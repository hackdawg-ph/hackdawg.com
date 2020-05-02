<?php

namespace App\Http\Controllers\Frontend;

use App\Models\User;
use App\Notifications\MessageSent;

class ContactController extends Controller
{
    /**
     * Send a message from the user to our emails.
     *
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function sendMessage()
    {
        $this->validate(request(), [
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required',
        ]);

        $user = User::where('email', 'hello@hackdawg.com')->firstOrFail();
        $user->notify(
            new MessageSent(request()->only('name', 'email', 'message'))
        );

        return back()->with('message', [
            'title' => 'Message sent!',
            'body' => "We'll try to get back to you as soon as possible.",
            'type' => 'success',
        ]);
    }
}
