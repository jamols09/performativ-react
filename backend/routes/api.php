<?php

use App\Http\Controllers\CelebrityController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/search', [CelebrityController::class, 'search']);
Route::post('/store', [CelebrityController::class, 'store']);
Route::delete('/delete/{id}', [CelebrityController::class, 'destroy']);
Route::get('/list', [CelebrityController::class, 'index']);
Route::put('update/{id}', [CelebrityController::class, 'update']);