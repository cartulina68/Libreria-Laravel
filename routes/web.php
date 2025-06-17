<?php

use App\Http\Controllers\AuthorController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('autores', [AuthorController::class, 'index'])->name('authors.index');
    Route::get('autores/crear', [AuthorController::class, 'create'])->name('authors.create');
    Route::post('autores', [AuthorController::class, 'store'])->name('authors.store');
    Route::get('autores/{author}/editar', [AuthorController::class, 'edit'])->name('authors.edit');
    Route::patch('autores/{author}', [AuthorController::class, 'update'])->name('authors.update');
    Route::delete('autores/{author}', [AuthorController::class, 'destroy'])->name('authors.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
