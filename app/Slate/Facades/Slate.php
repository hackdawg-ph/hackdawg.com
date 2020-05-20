<?php


namespace App\Slate\Facades;

use Illuminate\Support\Facades\Facade;

class Slate extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     *
     * @throws \RuntimeException
     */
    protected static function getFacadeAccessor()
    {
        return 'slate';
    }
}
