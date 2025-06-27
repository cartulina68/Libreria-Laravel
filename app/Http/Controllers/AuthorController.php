<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = Author::orderByDesc('created_at')->paginate(10);

        return Inertia::render('authors/index', [
            'authors' => $authors,
        ]);
    }

    public function create()
    {
        return Inertia::render('authors/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nationality' => 'required|string|max:255',
        ]);

        Author::create($validated);

        return redirect()->route('authors.index')
            ->with('message', 'Autor creado exitosamente.');
    }

    public function edit(Author $author)
    {
        return Inertia::render('authors/edit', [
            'author' => $author
        ]);
    }

    public function update(Request $request, Author $author)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nationality' => 'required|string|max:255',
        ]);

        $author->update($validated);

        return redirect()->route('authors.index')
            ->with('message', 'Autor actualizado exitosamente.');
    }

    public function destroy(Author $author)
    {
        $author->delete();

        return redirect()->route('authors.index')
            ->with('message', 'Autor eliminado exitosamente.');
    }
}
