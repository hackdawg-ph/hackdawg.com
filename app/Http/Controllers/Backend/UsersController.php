<?php

namespace App\Http\Controllers\Backend;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class UsersController extends Controller
{
    /**
     * Show a listing of users.
     *
     * @return Response
     */
    public function index()
    {
        return Inertia::render('Users/List', [
            'users' => User::paginate(10),
        ]);
    }
}
