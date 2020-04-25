<?php

namespace App\Http\Controllers\Backend;

use App\Models\Country;
use App\Rules\OldPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
            'avatar' => 'image|max:2048',
        ]);

        Auth::user()->update($request->only(['website', 'about']));

        if ($request->hasFile('avatar')) {
            Auth::user()
                ->addMedia($request->file('avatar'))
                ->toMediaCollection('avatars');
        }

        return back()->with('message', [
            'title' => 'Succesfully saved!',
            'body' => 'Profile information updated.',
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
            'body' => 'Personal information updated.',
            'type' => 'success',
        ]);
    }

    /**
     * Handle a request to update the user's password.
     *
     * @param \Illuminate\Http\Request  $request;
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'old_password' => ['required', new OldPassword(Auth::user()->password)],
            'new_password' => 'required|min:8',
        ]);

        Auth::user()->update([
            'password' => Hash::make($request->new_password),
        ]);

        return back()->with('message', [
            'title' => 'Succesfully saved!',
            'body' => 'Password updated.',
            'type' => 'success',
        ]);
    }
}
