<?php

namespace App\Http\Controllers;

use App\Mail\MessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Send a message from the user to our emails.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function sendMessage(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required',
        ]);

        Mail::send(new MessageSent($request->only('name', 'email', 'message')));

        return back()->with('message', [
            'title' => 'Message sent!',
            'body' => "We'll try to get back to you as soon as possible.",
            'type' => 'success',
        ]);
    }
}
