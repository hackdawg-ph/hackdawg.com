<?php

namespace Tests\Feature;

use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = $this->signIn();
});

it('shows a listing of tags', function () {
    $this->get(route('backend.tags.index'))
        ->assertOk()
        ->assertSee('Tags\/List');
});

it('can create a tag', function () {
    $this->get(route('backend.tags.create'))
        ->assertOk()
        ->assertSee('Tags\/Create');

    $data = [
        'name' => faker()->sentence,
        'description' => faker()->paragraph,
    ];

    $this->post(route('backend.tags.store'), $data)->assertRedirect();
    $this->assertDatabaseHas('tags', $data);
});

it('can update a tag', function () {
    $this->get(route('backend.tags.edit', ($tag = factory(Tag::class)->create())))
        ->assertOk()
        ->assertSee('Tags\/Edit');

    $data = [
        'name' => $tag->name,
        'description' => faker()->paragraph,
    ];

    $this->patch(route('backend.tags.update', $tag), $data)->assertRedirect();
    $this->assertDatabaseHas('tags', $data);
});

it('can delete a tag', function () {
    $this->delete(route('backend.tags.destroy', ($tag = factory(Tag::class)->create())))
        ->assertRedirect();

    $this->assertDatabaseMissing('tags', ['name' => $tag->name]);
});
