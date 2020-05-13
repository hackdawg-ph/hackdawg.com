<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Inertia\Inertia;

class ArticlesController extends Controller
{
    /**
     * Show a listing of articles.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Articles/List', [
            'articles' => Article::with('tags')->orderByDesc('published_at')->paginate(5),
        ]);
    }

    /**
     * Show the form for creating a new article.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Articles/Create');
    }

    /**
     * Store a newly created article in storage.
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store()
    {
        $this->validateArticle();

        $article = auth()->user()->createArticle(request(['title', 'body']));
        $article->tags()->attach(request('tags'));

        return redirect()->route('backend.articles.index')->with('message', [
            'title' => 'Success!',
            'body' => 'Article created.',
            'variant' => 'success',
        ]);
    }

    /**
     * Validate the properties of the article.
     *
     * @param \App\Models\Article|null $article
     *
     * @return array
     */
    protected function validateArticle($article = null)
    {
        return request()->validate([
            'title' => 'required',
            'body' => 'required',
            'tags' => 'exists:tags,id',
        ]);
    }
}
