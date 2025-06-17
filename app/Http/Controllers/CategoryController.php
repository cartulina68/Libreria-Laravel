<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::orderByDesc('created_at')->paginate(5);

        return Inertia::render('categories/index', [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return Inertia::render('categories/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        Category::create($validated);

        return redirect()->route('categories.index')
            ->with('message', 'Categoría creada exitosamente.');
    }

    public function edit(Category $category)
    {
        return Inertia::render('categories/edit', [
            'category' => $category
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $category->update($validated);

        return redirect()->route('categories.index')
            ->with('message', 'Categoría actualizada exitosamente.');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->route('categories.index')
            ->with('message', 'Categoría eliminada exitosamente.');
    }
}
