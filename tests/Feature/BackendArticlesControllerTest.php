<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BackendArticlesControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test **/
    public function it_shows_a_listing_of_articles()
    {
        $this->signIn();

        $this->get(route('backend.articles.index'))
            ->assertOk()
            ->assertSee('Articles\/List');
    }

    /** @test */
    public function it_can_create_an_article()
    {
        $this->signIn();

        $this->get(route('backend.articles.create'))
            ->assertOk()
            ->assertSee('Articles\/Create');

        $tags = factory(Tag::class, rand(1, 10))->create();

        $data = [
            'title' => $this->faker->sentence,
            'body' => $this->faker->paragraph,
            'tags' => ($attachedTags = $tags->random()->pluck('id')->toArray()),
        ];

        $this->post(route('backend.articles.store'), $data)->assertRedirect();

        unset($data['tags']);

        $this->assertDatabaseHas('articles', $data);

        $article = Article::latest()->firstOrFail();

        $this->assertEquals($attachedTags, $article->tags->pluck('id')->toArray());
    }

    /** @test */
    public function it_can_delete_an_article()
    {
        $this->signIn();

        $this->delete(route('backend.articles.destroy', ($article = factory(Article::class)->create())))
            ->assertRedirect();

        $this->assertDatabaseMissing('articles', ['id' => $article->id]);
    }
}
