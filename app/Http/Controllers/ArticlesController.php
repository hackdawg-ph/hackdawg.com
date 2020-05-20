<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Queries\RecentArticlesQuery;
use App\Queries\TopAuthorsQuery;
use App\Queries\TopTagsQuery;

class ArticlesController extends Controller
{
    /**
     * Show a listing of articles.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $articles = Article::with(['tags', 'author', 'author.media'])
            ->orderByDesc('published_at');

        if ($tag = request('tag')) {
            $articles = $articles->whereHas('tags', fn ($query) => $query->where('name', $tag));
        }

        if ($author = request('author')) {
            $articles = $articles->where('user_id', $author);
        }

        return view('articles.index', [
            'articles' => $articles->simplePaginate(10),
            'tags' => TopTagsQuery::run(),
            'authors' => TopAuthorsQuery::run(),
        ]);
    }

    /**
     * Display the specified article.
     *
     * @param Article $article
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function show(Article $article)
    {
        return view('articles.show', [
            'recentArticles' => RecentArticlesQuery::run([$article->id]),
            'article' => $article,
        ]);
    }
}
