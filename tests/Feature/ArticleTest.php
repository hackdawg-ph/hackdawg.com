<?php

use App\Models\Article;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('belongs to a user', function () {
    $user = factory(User::class)->create();
    $article = factory(Article::class)->create(['user_id' => $user->id]);

    assertInstanceOf(User::class, $article->author);
});

it('can belong to many tags', function () {
    $article = factory(Article::class)->create();
    $tags = factory(Tag::class, 5)->create();
    $article->tags()->attach($tags);

    assertInstanceOf(Tag::class, $article->tags->first());
});
