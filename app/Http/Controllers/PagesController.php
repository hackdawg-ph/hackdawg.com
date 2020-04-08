<?php

namespace App\Http\Controllers;

class PagesController extends Controller
{
    /**
     * Show's the applications welcome page.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function welcome()
    {
        return view('welcome');
    }
}
