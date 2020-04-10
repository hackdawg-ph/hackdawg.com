<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use NunoMaduro\LaravelMojito\InteractsWithViews;
use Tests\TestCase;

class ArticlesControllerTest extends TestCase
{
    use RefreshDatabase, InteractsWithViews;

    /** @test */
    public function it_displays_list_of_articles()
    {
        //
    }
}
