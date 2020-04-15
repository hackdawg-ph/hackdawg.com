<?php

use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::domain(get_domain('frontend'))->group(function () {
    Route::get('/', 'PagesController@welcome')->name('welcome');
    Route::get('/about', 'PagesController@about')->name('about');
    Route::post('/contact', 'ContactController@sendMessage')->name('contact');
    Route::resource('articles', 'ArticlesController');
});

Route::domain(get_domain('console'))->group(function () {
    Route::get('/', fn () => Inertia::render('Home'));
    Route::get('/users', fn () => Inertia::render('Users/List'));
});
