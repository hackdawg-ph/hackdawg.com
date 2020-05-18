<?php

namespace App\Http\Controllers\Backend\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ResetPasswordController extends Controller
{
    /**
     * Display the password reset view for the given token.
     *
     * If no token is present, display the link request form.
     *
     * @param  string|null  $token
     * @return \Inertia\Response
     */
    public function showResetForm($token = null)
    {
        return Inertia::render('Auth/Passwords/Reset', [
            'token' => $token,
            'email' => request('email'),
        ]);
    }

    /**
     * Reset the given user's password.
     *
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function reset()
    {
        $this->validate(request(), [
            'token' => 'required',
            'email' => 'required|email|exists:users',
            'password' => 'required|confirmed|min:8',
        ]);

        if (! $this->passwordReset()) {
            throw ValidationException::withMessages([
                'email' => [trans('passwords.token')],
            ]);
        }

        Auth::login($this->updatePassword());

        return redirect()->route('backend.home');
    }

    /**
     * Update the user's password.
     *
     * @return \App\Models\User|object
     */
    protected function updatePassword()
    {
        $user = User::where('email', request('email'))->first();
        $user->password = Hash::make(request('password'));
        $user->save();
        return $user;
    }

    /**
     * Get the password reset from storage.
     *
     * @return object|null
     */
    protected function passwordReset()
    {
        return DB::table('password_resets')
            ->where('token', request('token'))
            ->first();
    }
}
