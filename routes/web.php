<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // AUTOR
    Route::get('autores', [AuthorController::class, 'index'])->name('authors.index');
    Route::get('autores/crear', [AuthorController::class, 'create'])->name('authors.create');
    Route::post('autores', [AuthorController::class, 'store'])->name('authors.store');
    Route::get('autores/{author}/editar', [AuthorController::class, 'edit'])->name('authors.edit');
    Route::patch('autores/{author}', [AuthorController::class, 'update'])->name('authors.update');
    Route::delete('autores/{author}', [AuthorController::class, 'destroy'])->name('authors.destroy');

    // CATEGORIA
    Route::get('categorias', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('categorias/crear', [CategoryController::class, 'create'])->name('categories.create');
    Route::post('categorias', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('categorias/{category}/editar', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::patch('categorias/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('categorias/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
