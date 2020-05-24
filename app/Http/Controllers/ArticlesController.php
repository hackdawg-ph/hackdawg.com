<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Queries\ArticleArchivesQuery;
use App\Queries\RecentArticlesQuery;
use App\Queries\TopTagsQuery;
use Carbon\Carbon;

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
            ->whereNotNull('published_at')
            ->orderByDesc('published_at');

        if ($tag = request('tag')) {
            $articles->whereHas('tags', fn ($query) => $query->where('name', $tag));
        }

        if ($month = request('month')) {
            $articles->whereMonth('published_at', Carbon::parse($month)->month);
        }

        if ($year = request('year')) {
            $articles->whereYear('published_at', $year);
        }

        return view('articles.index', [
            'articles' => $articles->simplePaginate(10),
            'tags' => TopTagsQuery::run(),
            'archives' => ArticleArchivesQuery::run(),
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
