<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\RegisterController;

Route::get('/test', function (Request $request) {
    return response()->json("Test OK", 200);
});

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [RegisterController::class, 'login']); // Tambahkan rute login

// Pindahkan rute store keluar dari grup middleware auth:sanctum
Route::post('/book/store', [BukuController::class, 'store']);
Route::get('/book/show/{id}', [BukuController::class, 'show']); // Pastikan rute ini ada

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/bukus', [BukuController::class, 'index']);
    Route::get('/logout', [RegisterController::class, 'logout']);

    Route::controller(BukuController::class)->group(function() {
        Route::get('/book/buku', 'index');
        Route::get('/book/show/{id}', 'show');
        Route::post('/book/update/{id}', 'update');
        Route::get('/book/delete/{id}', 'destroy');
    });
});
?>
