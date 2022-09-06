<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return response()->file('/dist/index.html');
})->name('app');

// TODO:
/**
 * If you choose to disable Fortify's views and you will be implementing password reset features for your application,
 * you should still define a route named password.reset that is responsible for displaying your application's
 * "reset password" view. This is necessary because Laravel's Illuminate\Auth\Notifications\ResetPassword
 * notification will generate the password reset URL via the password.reset named route.
 */