<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ArticleTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function it_belongs_to_a_user()
    {
        $user = factory(User::class)->create();
        $article = factory(Article::class)->create(['user_id' => $user->id]);

        $this->assertInstanceOf(User::class, $article->author);
    }

    /** @test */
    public function it_can_belong_to_many_tags()
    {
        $article = factory(Article::class)->create();
        $tags = factory(Tag::class, 5)->create();
        $article->tags()->attach($tags);

        $this->assertInstanceOf(Tag::class, $article->tags->first());
    }
}
