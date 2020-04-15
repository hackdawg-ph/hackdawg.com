<?php

if (! function_exists('get_domain')) {
    /**
     * Get the domain for a given application
     *
     * @param string $application It can be: frontend, console.
     * @return string
     */
    function get_domain($application = 'frontend')
    {
        $applications = [
            'frontend' => [
                'production' => 'www.hackdawg.com',
                'local' => 'www.hackdawg.test',
            ],
            'console' => [
                'production' => 'console.hackdawg.com',
                'local' => 'console.hackdawg.test',
            ],
        ];

        return $applications[$application][config('app.env')];
    }
}
