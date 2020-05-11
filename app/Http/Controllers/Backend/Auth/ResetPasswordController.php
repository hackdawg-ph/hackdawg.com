<?php

namespace App\Http\Controllers\Backend\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
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
     * @param  \Illuminate\Http\Request  $request
     * @param  string|null  $token
     * @return \Inertia\Response
     */
    public function showResetForm(Request $request, $token = null)
    {
        return Inertia::render('Auth/Passwords/Reset', [
            'token' => $token,
            'email' => $request->email,
        ]);
    }

    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email|exists:users',
            'password' => 'required|confirmed|min:8',
        ]);

        if (! $this->passwordReset($request)) {
            throw ValidationException::withMessages([
                'email' => [trans('passwords.token')],
            ]);
        }

        $user = $this->updatePassword($request);

        Auth::login($user);

        return redirect()->route('backend.home');
    }

    /**
     * Update the user's password.
     *
     * @param \Illuminate\Http\Request $request
     * @return \App\Models\User|object
     */
    protected function updatePassword($request)
    {
        $user = User::where('email', $request->email)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        return $user;
    }

    /**
     * Get the password reset from storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return object|null
     */
    protected function passwordReset($request)
    {
        return DB::table('password_resets')
            ->where('token', $request->input('token'))
            ->first();
    }
}
