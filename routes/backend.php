<?php

Route::namespace('Auth')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('login', 'LoginController@showLoginForm')->name('login');
        Route::post('login', 'LoginController@login');
    });

    Route::post('logout', 'LoginController@logout')
        ->middleware('auth')
        ->name('logout');

    Route::prefix('password')->name('password.')->group(function () {
        Route::get('reset', 'ForgotPasswordController@showLinkRequestForm')->name('request');
        Route::post('email', 'ForgotPasswordController@sendResetLinkEmail')->name('email');
        Route::get('reset/{token}', 'ResetPasswordController@showResetForm')->name('reset');
        Route::post('reset', 'ResetPasswordController@reset')->name('update');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/', 'HomeController@index')->name('home');
    Route::resource('tags', 'TagsController');
    Route::resource('articles', 'ArticlesController');
    Route::resource('users', 'UsersController');

    Route::prefix('account')->name('account.')->group(function () {
        Route::get('/', 'AccountController@showAccountPage')->name('index');
        Route::post('profile', 'AccountController@updateProfile')->name('profile');
        Route::post('personal', 'AccountController@updatePersonal')->name('personal');
        Route::post('password', 'AccountController@updatePassword')->name('password');
    });
});
