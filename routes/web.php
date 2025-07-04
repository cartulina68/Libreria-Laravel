<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->middleware('role:admin')->name('dashboard');

    // Rutas para administradores
    Route::middleware(['role:admin'])->group(function () {
        Route::get('/usuarios', [UserController::class, 'index'])->name('users.index');
        Route::patch('usuarios/{user}/desactivar', [UserController::class, 'deactivate'])->name('users.deactivate');
        Route::patch('/usuarios/{user}/toggle-estado', [UserController::class, 'toggleEstado']);


        Route::get('autores', [AuthorController::class, 'index'])->name('authors.index');
        Route::get('autores/crear', [AuthorController::class, 'create'])->name('authors.create');
        Route::post('autores', [AuthorController::class, 'store'])->name('authors.store');
        Route::get('autores/{author}/editar', [AuthorController::class, 'edit'])->name('authors.edit');
        Route::patch('autores/{author}', [AuthorController::class, 'update'])->name('authors.update');
        Route::delete('autores/{author}', [AuthorController::class, 'destroy'])->name('authors.destroy');

        Route::get('categorias', [CategoryController::class, 'index'])->name('categories.index');
        Route::get('categorias/crear', [CategoryController::class, 'create'])->name('categories.create');
        Route::post('categorias', [CategoryController::class, 'store'])->name('categories.store');
        Route::get('categorias/{category}/editar', [CategoryController::class, 'edit'])->name('categories.edit');
        Route::patch('categorias/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('categorias/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

        Route::get('libros', [BookController::class, 'index'])->name('books.index');
        Route::get('libros/crear', [BookController::class, 'create'])->name('books.create');
        Route::post('libros', [BookController::class, 'store'])->name('books.store');
        Route::get('libros/{book}/editar', [BookController::class, 'edit'])->name('books.edit');
        Route::patch('libros/{book}', [BookController::class, 'update'])->name('books.update');
        Route::delete('libros/{book}', [BookController::class, 'destroy'])->name('books.destroy');
    });

    // Rutas para clientes
    Route::get('/catalogo', [BookController::class, 'catalog'])->name('books.catalog');
    Route::get('/prestamos/{book}/crear', [LoanController::class, 'create'])->name('loans.create');
    Route::post('/prestamos/{book}', [LoanController::class, 'store'])->name('loans.store');
    Route::get('/prestamos/{loan}/confirmacion', [LoanController::class, 'success'])->name('loans.success');
    Route::get('/prestamos', [LoanController::class, 'index'])->middleware('auth')->name('loans.index');
Route::get('/loans/{loan}', [LoanController::class, 'show'])->name('loans.show');

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
