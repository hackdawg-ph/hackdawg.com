<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class ConsoleServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Inertia::share([
            'message' => fn () => Session::get('message'),
            'errors' => function () {
                return Session::get('errors')
                    ? Session::get('errors')->getBag('default')->getMessages()
                    : (object) [];
            },
            'auth' => function () {
                return [
                    'user' => Auth::user() ? [
                        'id'        => Auth::user()->id,
                        'username'  => Auth::user()->username,
                        'about'     => Auth::user()->about,
                        'avatarUrl' => Auth::user()->avatarUrl,
                        'name'      => Auth::user()->name,
                        'email'     => Auth::user()->email,
                    ] : null,
                ];
            },
        ]);
    }
}
