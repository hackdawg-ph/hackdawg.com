<?php

namespace App\Http\Controllers\Backend\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\PasswordReset;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ForgotPasswordController extends Controller
{
    /**
     * Display the form to request a password reset link.
     *
     * @return \Inertia\Response
     */
    public function showLinkRequestForm()
    {
        return Inertia::render('Auth/Passwords/Email');
    }

    /**
     * Send a reset link to the given user.
     *
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function sendResetLinkEmail()
    {
        $this->validate(request(), [
            'email' => 'required|exists:users',
        ]);

        $this->deleteResetTokens();
        $this->sendResetLinkEmailNotification($this->storeResetToken(), request('email'));

        return back()->with('status', 'We have emailed your password reset link!');
    }

    /**
     * Send the reset link email notification.
     *
     * @param  string $token
     * @param  string $email
     * @return void
     */
    protected function sendResetLinkEmailNotification($token, $email)
    {
        $user = User::where('email', $email)->first();

        $user->notify(
            new PasswordReset(
                route('backend.password.reset', compact('token'))
            )
        );
    }

    /**
     * Store new token to storage.
     *
     * @return string
     */
    protected function storeResetToken()
    {
        DB::table('password_resets')->insert([
            'email' => request('email'),
            'token' => Str::random(64),
            'created_at' => Carbon::now(),
        ]);

        $passwordReset = DB::table('password_resets')->first();

        return $passwordReset->token;
    }

    /**
     * Remove existing tokens from storage.
     *
     * @return bool
     */
    protected function deleteResetTokens()
    {
        return DB::table('password_resets')
            ->where('email', request('email'))
            ->delete();
    }
}
