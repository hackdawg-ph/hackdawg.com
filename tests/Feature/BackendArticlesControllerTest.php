<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

beforeEach(fn () => $this->signIn());

it('shows a listing of articles', function () {
    $this->get(route('backend.articles.index'))
        ->assertOk()
        ->assertSee('Articles\/List');
});

it('can create an article', function () {
    $this->get(route('backend.articles.create'))
        ->assertOk()
        ->assertSee('Articles\/Create');

    Storage::fake('covers');

    $tags = factory(Tag::class, rand(1, 10))->create();

    $data = [
        'title' => faker()->sentence,
        'cover' => UploadedFile::fake()->image('cover.jpg'),
        'body' => faker()->paragraph,
        'tags' => ($attachedTags = $tags->random()->pluck('id')->toArray()),
    ];

    $this->post(route('backend.articles.store'), $data)->assertRedirect();

    unset($data['cover']);
    unset($data['tags']);

    $this->assertDatabaseHas('articles', $data);

    $article = Article::latest()->firstOrFail();

    $this->assertDatabaseHas('media', [
        'model_type' => Article::class,
        'model_id' => $article->id,
        'collection_name' => 'covers',
        'file_name' => 'cover.jpg',
    ]);

    $this->assertEquals($attachedTags, $article->tags->pluck('id')->toArray());
});

it('can update an article', function () {
    $this->get(route('backend.articles.edit', ($article = factory(Article::class)->create())))
        ->assertOk()
        ->assertSee('Articles\/Edit');

    Storage::fake('covers');

    $tags = factory(Tag::class, rand(1, 10))->create();

    $data = [
        'title' => $article->title,
        'cover' => UploadedFile::fake()->image('cover.jpg'),
        'body' => faker()->paragraph(rand(5, 10)),
        'tags' => ($attachedTags = $tags->random()->pluck('id')->toArray()),
    ];

    $this->patch(route('backend.articles.update', $article), $data)
        ->assertRedirect();

    unset($data['cover']);
    unset($data['tags']);

    $this->assertDatabaseHas('articles', $data);

    $article = Article::latest()->firstOrFail();

    $this->assertDatabaseHas('media', [
        'model_type' => Article::class,
        'model_id' => $article->id,
        'collection_name' => 'covers',
        'file_name' => 'cover.jpg',
    ]);

    $this->assertEquals($attachedTags, $article->tags->pluck('id')->toArray());
});

it('can delete an article', function () {
    $this->delete(route('backend.articles.destroy', ($article = factory(Article::class)->create())))
        ->assertRedirect();

    $this->assertDatabaseMissing('articles', ['id' => $article->id]);
});

