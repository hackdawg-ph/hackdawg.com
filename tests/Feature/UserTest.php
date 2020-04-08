<?php

namespace Tests\Feature;

use App\Article;
use App\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function it_can_have_many_articles()
    {
        $user = factory(User::class)->create();
        factory(Article::class, 10)->create(['user_id' => $user->id]);

        $this->assertInstanceOf(Collection::class, $user->articles);
        $this->assertInstanceOf(Article::class, $user->articles->first());
    }

    /** @test */
    public function it_can_create_an_article()
    {
        $user = factory(User::class)->create();
        $article = $user->createArticle([
            'title' => ($title = $this->faker->sentence),
            'slug' => Str::slug($title),
            'body' => $this->faker->paragraph,
        ]);

        $this->assertInstanceOf(Article::class, $article);
    }
}
