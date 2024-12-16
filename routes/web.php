<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');

Route::get('/build/{path}', function ($path) {
    return response()->file(public_path("build/$path"));
});

Route::get('/{pathMatch}', function () {
    return view('welcome');
})->where('pathMatch', '.*');
