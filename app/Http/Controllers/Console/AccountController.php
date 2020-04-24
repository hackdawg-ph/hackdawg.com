<?php

namespace App\Http\Controllers\Console;

use App\Country;
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
        return Inertia::render('Account', [
            'countries' => Country::all(),
        ]);
    }

    /**
     * Handle a request to update the user's profile.
     *
     * @param \Illuminate\Http\Request  $request;
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function updateProfile(Request $request)
    {
        $request->validate([
            'website' => 'url',
            'avatar' => 'image|max:10240',
        ]);

        Auth::user()->update($request->only(['website', 'about']));

        if ($request->hasFile('avatar')) {
            Auth::user()
                ->addMedia($request->file('avatar'))
                ->toMediaCollection('avatars');
        }

        return back()->with('message', [
            'title' => 'Succesfully saved!',
            'body' => "Profile information updated.",
            'type' => 'success',
        ]);
    }

    /**
     * Handle a request to update the user's personal information.
     *
     * @param \Illuminate\Http\Request  $request;
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function updatePersonal(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users,email,'.Auth::user()->id,
        ]);

        Auth::user()->update($request->only([
            'first_name',
            'last_name',
            'email',
            'country',
            'state',
            'city',
            'street_address',
            'postal_code',
        ]));

        return back()->with('message', [
            'title' => 'Succesfully saved!',
            'body' => "Personal information updated.",
            'type' => 'success',
        ]);
    }
}
