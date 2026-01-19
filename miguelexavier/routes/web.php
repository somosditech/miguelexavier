<?php

use Illuminate\Support\Facades\Route;

// Rota raiz - Serve o site público
Route::get('/', function () {
    return view('public-site');
});

// Painel Admin - Catch-all
Route::get('/p_admin/{any?}', function () {
    return view('admin');
})->where('any', '.*');

// Catch-all para rotas do site público (SPA)
Route::get('/{any}', function () {
    return view('public-site');
})->where('any', '^(?!api|p_admin).*$');
