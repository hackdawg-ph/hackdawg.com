<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if (env('APP_ENV') === 'production') {
            URL::forceScheme('https');
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if (in_backend() || config('app.env') === 'testing') {
            Inertia::setRootView('backend.app');
        }

        $this->shareBackendData();
    }

    protected function shareBackendData()
    {
        if (in_backend()) {
            Inertia::share([
                'message' => fn () => Session::get('message'),
                'form' => fn () => [
                    'status' => Session::get('status'),
                    'errors' => Session::get('errors')
                        ? Session::get('errors')->getBag('default')->getMessages()
                        : (object) [],
                ],
                'auth' => fn () => [
                    'user' => Auth::user() ? [
                        'id' => Auth::user()->id,
                        'job_title' => Auth::user()->job_title,
                        'company' => Auth::user()->company,
                        'website' => Auth::user()->website,
                        'about' => Auth::user()->about,
                        'avatar_url' => Auth::user()->avatar_url,
                        'first_name' => Auth::user()->first_name,
                        'middle_name' => Auth::user()->middle_name,
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
                ],
            ]);
        }
    }
}
