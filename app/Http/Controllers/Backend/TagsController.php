<?php

namespace App\Http\Controllers\Backend;

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
        return Inertia::render('Tags/List');
    }
}
