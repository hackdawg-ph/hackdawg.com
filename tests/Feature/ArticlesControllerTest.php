<?php

namespace Tests\Feature;

use App\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
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
