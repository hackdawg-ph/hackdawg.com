<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BackendUsersControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test **/
    public function it_shows_a_listing_of_users()
    {
        $this->signIn();

        $this->get(route('backend.users.index'))
            ->assertOk()
            ->assertSee('Users\/List');
    }
}
