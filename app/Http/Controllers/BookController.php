<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Author;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::with(['author', 'category'])
            ->orderByDesc('created_at')
            ->paginate(5);

        return Inertia::render('books/index', [
            'books' => $books,
        ]);
    }

    public function create()
    {
        return Inertia::render('books/create', [
            'authors' => Author::select('id', 'name')->get(),
            'categories' => Category::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'publication_year' => 'required|integer|min:1000|max:' . date('Y'),
            'price_per_day' => 'required|numeric|min:0',
            'author_id' => 'required|exists:authors,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        Book::create($validated);

        return redirect()->route('books.index')
            ->with('message', 'Libro creado exitosamente.');
    }

    public function edit(Book $book)
    {
        return Inertia::render('books/edit', [
            'book' => $book->load('author', 'category'),
            'authors' => Author::select('id', 'name')->get(),
            'categories' => Category::select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'publication_year' => 'required|integer|min:1000|max:' . date('Y'),
            'price_per_day' => 'required|numeric|min:0',
            'author_id' => 'required|exists:authors,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        $book->update($validated);

        return redirect()->route('books.index')
            ->with('message', 'Libro actualizado exitosamente.');
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()->route('books.index')
            ->with('message', 'Libro eliminado exitosamente.');
    }
}
