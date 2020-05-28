<?php

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;

uses(RefreshDatabase::class);

it('can have many articles', function () {
    $user = factory(User::class)->create();
    factory(Article::class, 10)->create(['user_id' => $user->id]);

    assertInstanceOf(Collection::class, $user->articles);
    assertInstanceOf(Article::class, $user->articles->first());
});

it('can create an article', function () {
    /** @var User $user */
    $user = factory(User::class)->create();
    $article = $user->createArticle([
        'title' => ($title = faker()->sentence),
        'slug' => Str::slug($title),
        'body' => faker()->paragraph,
    ]);

    assertInstanceOf(Article::class, $article);
});
