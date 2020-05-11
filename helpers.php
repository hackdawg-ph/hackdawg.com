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
        return Str::startsWith(request()->path(), 'admin');
    }
}
