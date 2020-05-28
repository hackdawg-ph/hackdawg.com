<?php

use App\Models\Article;
use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('can belong to many articles', function () {
    /** @var Tag $tag */
    $tag = factory(Tag::class)->create();
    $tag->articles()->attach(factory(Article::class, 5)->create());

    assertInstanceOf(Article::class, $tag->articles->first());
});
