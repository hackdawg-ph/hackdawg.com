<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withExceptionHandling();
    }

    protected function signIn($user = null)
    {
        $user = $user ?: factory('App\Models\User')->create();

        $this->actingAs($user);

        return $user;
    }
}
