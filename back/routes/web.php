<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Servir painel admin (SPA)
Route::get('/admin/{any?}', function () {
    return view('admin');
})->where('any', '.*');
