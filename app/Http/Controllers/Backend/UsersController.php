<?php

namespace App\Http\Controllers\Backend;

use Inertia\Inertia;

class UsersController extends Controller
{
    /**
     * Show a listing of users.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Users/List');
    }
}
