<?php

namespace App\Http\Controllers\Console;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class TagsController extends Controller
{
    /**
     * Show a listing of tags.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Home');
    }
}
