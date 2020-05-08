<?php

namespace Tests\Feature;

use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BackendTagsControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test **/
    public function it_shows_a_listing_of_tags()
    {
        $this->signIn();

        $this->get(route('backend.tags.index'))
            ->assertOk()
            ->assertSee('Tags\/List');
    }

    /** @test */
    public function it_can_create_a_tag()
    {
        $this->signIn();

        $this->get(route('backend.tags.create'))
            ->assertOk()
            ->assertSee('Tags\/Create');

        $data = [
            'name' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
        ];

        $this->post(route('backend.tags.store'), $data)
            ->assertRedirect();

        $this->assertDatabaseHas('tags', $data);
    }

    /** @test */
    public function it_can_update_a_tag()
    {
        $this->signIn();

        $this->get(route('backend.tags.edit', ($tag = factory(Tag::class)->create())))
            ->assertOk()
            ->assertSee('Tags\/Edit');

        $data = [
            'name' => $tag->name,
            'description' => $this->faker->paragraph,
        ];

        $this->patch(route('backend.tags.update', $tag), $data)
            ->assertRedirect();

        $this->assertDatabaseHas('tags', $data);
    }

    /** @test */
    public function it_can_delete_a_tag()
    {
        $this->signIn();

        $this->delete(route('backend.tags.destroy', ($tag = factory(Tag::class)->create())))
            ->assertRedirect();

        $this->assertDatabaseMissing('tags', ['name' => $tag->name]);
    }
}
