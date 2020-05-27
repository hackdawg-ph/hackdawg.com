<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\Tag;
use App\Queries\ArticleArchivesQuery;
use App\Queries\RecentArticlesQuery;
use App\Queries\TopTagsQuery;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use NunoMaduro\LaravelMojito\InteractsWithViews;
use Tests\TestCase;

class ArticlesControllerTest extends TestCase
{
    use InteractsWithViews, RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();

        $tags = factory(Tag::class, 10)->create();
        $articles = factory(Article::class, rand(10, 100))->create([
            'body' => '[{"children":[{"text":"'. $this->faker->paragraph(5) .'"}]}]',
        ]);
        $articles->each(fn ($article) => $article->tags()->attach($tags->random(rand(5, 10))));
    }

    /** @test */
    public function it_shows_a_listing_of_articles()
    {
        dd($this->get(route('articles.index'))->getContent());

        $this->get(route('articles.index'))
            ->assertOk()
            ->assertViewHas(
                'articles',
                Article::with(['media', 'tags', 'author', 'author.media'])
                    ->whereNotNull('published_at')
                    ->orderByDesc('published_at')
                    ->simplePaginate(10)
            )
            ->assertViewHas('tags', TopTagsQuery::run())
            ->assertViewHas('archives', ArticleArchivesQuery::run())
            ->assertView('articles.index')
            ->contains('Welcome to Our Blog');
    }

    /** @test */
    public function it_shows_an_article()
    {
        $this->get(route('articles.show', ($article = Article::first())))
            ->assertOk()
            ->assertViewHas('recentArticles', RecentArticlesQuery::run([$article->id]))
            ->assertViewHas('article', $article)
            ->assertView('articles.show')
            ->contains($article->title);
    }
}
