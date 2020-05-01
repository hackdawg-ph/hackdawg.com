<?php

namespace App\Http\Controllers\Backend;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return InertiaResponse
     */
    public function index()
    {
        return Inertia::render('Users/List', [
            'users' => User::paginate(5),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return InertiaResponse
     */
    public function create()
    {
        return Inertia::render('Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return RedirectResponse
     */
    public function store()
    {
        return back();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return InertiaResponse
     */
    public function edit()
    {
        return Inertia::render('Users/Edit');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request $request
     * @param  User  $user
     * @return RedirectResponse
     */
    public function update(Request $request, User $user)
    {
        return back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  User  $user
     * @return RedirectResponse
     */
    public function destroy(User $user)
    {
        return back();
    }
}
