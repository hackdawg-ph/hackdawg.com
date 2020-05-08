<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TagTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function it_can_belong_to_many_articles()
    {
        $tag = factory(Tag::class)->create();
        $articles = factory(Article::class, 5)->create();
        $tag->articles()->attach($articles);

        $this->assertInstanceOf(Article::class, $tag->articles->first());
    }
}
