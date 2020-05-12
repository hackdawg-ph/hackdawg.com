<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BackendArticlesControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test **/
    public function it_shows_a_listing_of_articles()
    {
        $this->signIn();

        $this->get(route('backend.articles.index'))
            ->assertOk()
            ->assertSee('Articles\/List');
    }

    public function it_can_create_an_article()
    {
        $this->signIn();

        $this->get(route('backend.articles.create'))
            ->assertOk()
            ->assertSee('Articles\/Create');

        $data = [
            //
        ];

        $this->post(route('backend.articles.store'), $data)
            ->assertRedirect();

        $this->assertDatabaseHas('articles', $data);
    }
}
