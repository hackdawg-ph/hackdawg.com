<?php

/*
|--------------------------------------------------------------------------
| Backend Routes
|--------------------------------------------------------------------------
|
| Here is where you can register backend routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::auth(['register' => false]);
Route::middleware('auth')->group(function () {
    Route::prefix('account')->name('account.')->group(function () {
        Route::get('/', 'AccountController@showAccountPage')->name('index');
        Route::post('profile', 'AccountController@updateProfile')->name('profile');
        Route::post('personal', 'AccountController@updatePersonal')->name('personal');
        Route::post('password', 'AccountController@updatePassword')->name('password');
    });

    Route::get('/', 'HomeController@index')->name('home');
    Route::resource('tags', 'TagsController');
    Route::resource('articles', 'ArticlesController');
    Route::resource('users', 'UsersController');
});
