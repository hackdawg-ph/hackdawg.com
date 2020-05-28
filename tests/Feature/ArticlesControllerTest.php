<?php

use App\Models\Article;
use App\Models\Tag;
use App\Queries\ArticleArchivesQuery;
use App\Queries\RecentArticlesQuery;
use App\Queries\TopTagsQuery;
use Illuminate\Foundation\Testing\RefreshDatabase;
use NunoMaduro\LaravelMojito\InteractsWithViews;

uses(InteractsWithViews::class);
uses(RefreshDatabase::class);

beforeEach(function () {
    $tags = factory(Tag::class, 10)->create();
    $articles = factory(Article::class, rand(10, 100))->create([
        'body' => '[{"children":[{"text":"'. faker()->paragraph(5) .'"}]}]',
    ]);
    $articles->each(fn ($article) => $article->tags()->attach($tags->random(rand(5, 10))));
});

it('shows a listing of articles', function () {
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
});

it('shows an article', function () {
    $this->get(route('articles.show', ($article = Article::first())))
        ->assertOk()
        ->assertViewHas('recentArticles', RecentArticlesQuery::run([$article->id]))
        ->assertViewHas('article', $article)
        ->assertView('articles.show')
        ->contains($article->title);
});

