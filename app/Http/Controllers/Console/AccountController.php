<?php

namespace App\Http\Controllers\Console;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Show the user's account page.
     *
     * @return \Inertia\Response
     */
    public function showAccountPage()
    {
        return Inertia::render('Account');
    }

    /**
     * Handle a request to update the user.
     *
     * @param \Illuminate\Http\Request  $request;
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,'.Auth::user()->id,
            'username' => 'required|string|unique:users,username,'.Auth::user()->id,
        ]);

        Auth::user()->update(
            $request->only('name', 'email', 'username', 'about')
        );

        return back()->with('message', [
            'title' => 'Succesfully saved!',
            'body' => "Account information updated.",
            'type' => 'success',
        ]);
    }
}
