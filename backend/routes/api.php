<?php

use App\Http\Controllers\RpsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['prefix'=>'rps'], function () {
    Route::post('/', [RpsController::class, 'store']);
});