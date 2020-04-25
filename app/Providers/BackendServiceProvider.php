<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class BackendServiceProvider extends ServiceProvider
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
            'status' => fn () => Session::get('status'),
            'message' => fn () => Session::get('message'),
            'errors' => function () {
                return Session::get('errors')
                    ? Session::get('errors')->getBag('default')->getMessages()
                    : (object) [];
            },
            'auth' => function () {
                return [
                    'user' => Auth::user() ? [
                        'id' => Auth::user()->id,
                        'website' => Auth::user()->website,
                        'about' => Auth::user()->about,
                        'avatarUrl' => Auth::user()->avatarUrl,
                        'first_name' => Auth::user()->first_name,
                        'middlename' => Auth::user()->middlename,
                        'last_name' => Auth::user()->last_name,
                        'email' => Auth::user()->email,
                        'birthdate' => Auth::user()->birthdate,
                        'gender' => Auth::user()->gender,
                        'country' => Auth::user()->country,
                        'state' => Auth::user()->state,
                        'city' => Auth::user()->city,
                        'street_address' => Auth::user()->street_address,
                        'postal_code' => Auth::user()->postal_code,
                    ] : null,
                ];
            },
        ]);
    }
}
