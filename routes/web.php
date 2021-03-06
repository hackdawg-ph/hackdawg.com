<?php

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

Route::get('/', 'PagesController@welcome')->name('welcome');
Route::get('about', 'PagesController@about')->name('about');

Route::prefix('articles')->name('articles.')->group(function () {
    Route::get('/', 'ArticlesController@index')->name('index');
    Route::get('{article:slug}', 'ArticlesController@show')->name('show');
});
