<?php

/*
|--------------------------------------------------------------------------
| Frontend Routes
|--------------------------------------------------------------------------
|
| Here is where you can register frontend routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'PagesController@welcome')->name('welcome');
Route::get('/about', 'PagesController@about')->name('about');
Route::post('/contact', 'ContactController@sendMessage')->name('contact');
Route::resource('articles', 'ArticlesController');