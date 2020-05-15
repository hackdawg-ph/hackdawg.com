<?php

namespace App\Http\Controllers;

use App\Models\Article;

class ArticlesController extends Controller
{
    /**
     * Show a listing of articles.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('articles.index', [
            'articles' => Article::take(10)->get(),
        ]);
    }
}
