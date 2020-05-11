<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
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
        return Inertia::render('Articles/List');
    }
}
