<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Inertia\Inertia;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = Author::paginate(5);

        return Inertia::render('authors/index', [
            'authors' => $authors
        ]);
    }
}
