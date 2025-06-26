<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->paginate(10); // Carga sus roles

        return Inertia::render('users/index', [
            'users' => $users,
        ]);
    }
}
