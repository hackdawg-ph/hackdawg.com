<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Tag;
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
        return Inertia::render('Articles/Create', [
            'tags' => Tag::get(['id', 'name']),
        ]);
    }

    /**
     * Store a newly created article in storage.
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     *
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig
     */
    public function store()
    {
        $this->validateArticle();

        $article = auth()->user()->createArticle(request(['title', 'body']));
        $article->tags()->attach(request('tags'));
        $this->addCoverMedia($article);

        return redirect()->route('backend.articles.index')->with('message', [
            'title' => 'Success!',
            'body' => 'Article created.',
            'variant' => 'success',
        ]);
    }

    /**
     * Show the form for editing the specified article.
     *
     * @param  \App\Models\Article $article
     * @return \Inertia\Response
     */
    public function edit(Article $article)
    {
        return Inertia::render('Articles/Edit', [
            'article' => $article,
            'tags' => Tag::all(),
        ]);
    }

    /**
     * Update the specified article in storage.
     *
     * @param \App\Models\Article $article
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     *
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig
     */
    public function update(Article $article)
    {
        $this->validateArticle();

        $article->update(request(['title', 'body']));
        $article->tags()->detach();
        $article->tags()->attach(
            is_string($tags = request('tags')) ? explode(',', $tags) : $tags
        );
        $this->addCoverMedia($article);

        return redirect()->route('backend.articles.index')->with('message', [
            'title' => 'Success!',
            'body' => 'Article details updated.',
            'variant' => 'success',
        ]);
    }

    /**
     * Remove the specified article from storage.
     *
     * @param \App\Models\Article $article
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     *
     * @throws \Exception
     */
    public function destroy(Article $article)
    {
        $article->delete();

        return back()->with('message', [
            'title' => 'Success!',
            'body' => 'Article deleted.',
            'variant' => 'success',
        ]);
    }

    /**
     * Add cover file to the media library for the article.
     *
     * @param Article $article
     * @return void
     *
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig
     */
    protected function addCoverMedia(Article $article)
    {
        if (request()->hasFile('cover')) {
            $article->addMedia(request()->file('cover'))->toMediaCollection('covers');
        }
    }

    /**
     * Validate the properties of the article.
     *
     * @return array
     */
    protected function validateArticle()
    {
        return request()->validate([
            'title' => 'required',
            'body' => 'required',
            'tags' => 'nullable|exists:tags,id',
        ]);
    }
}
