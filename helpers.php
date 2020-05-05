<?php

use Illuminate\Support\Str;

if (! function_exists('in_backend')) {
    /**
     * Whether in the backend application.
     *
     * @return bool
     */
    function in_backend()
    {
        return Str::contains(request()->getHost(), 'console.');
    }
}

if (! function_exists('get_domain')) {
    /**
     * Get the domain for a given application
     *
     * @param string $application It can be: frontend, backend.
     * @return string
     */
    function get_domain($application = 'frontend')
    {
        $applications = [
            'frontend' => [
                'production' => 'www.hackdawg.com',
                'local' => 'www.hackdawg.test',
                'testing' => 'www.hackdawg.test',
            ],
            'backend' => [
                'production' => 'console.hackdawg.com',
                'local' => 'console.hackdawg.test',
                'testing' => 'console.hackdawg.test',
            ],
        ];

        return $applications[$application][config('app.env')];
    }
}
