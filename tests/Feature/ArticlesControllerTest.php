<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\Tag;
use App\Queries\TopAuthorsQuery;
use App\Queries\TopTagsQuery;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use NunoMaduro\LaravelMojito\InteractsWithViews;
use Tests\TestCase;

class ArticlesControllerTest extends TestCase
{
    use InteractsWithViews, RefreshDatabase, WithFaker;

    public function setUp(): void
    {
        parent::setUp();

        $tags = factory(Tag::class, 10)->create();
        $articles = factory(Article::class, rand(10, 100))->create();
        $articles->each(fn ($article) => $article->tags()->attach($tags->random(rand(5, 10))));
    }

    /** @test */
    public function it_shows_a_listing_of_articles()
    {
        $this->get(route('articles.index'))
            ->assertOk()
            ->assertViewHas(
                'articles',
                Article::with(['media', 'tags', 'author', 'author.media'])
                    ->orderByDesc('published_at')
                    ->simplePaginate(10)
            )
            ->assertViewHas('tags', TopTagsQuery::run())
            ->assertViewHas('authors', TopAuthorsQuery::run())
            ->assertView('articles.index')
            ->contains('Welcome to Our Blog');
    }
}
