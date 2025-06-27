<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->paginate(10); // Carga sus roles

        return Inertia::render('users/index', [
            'users' => $users,
        ]);
    }

    public function deactivate(User $user)
    {
        if ($user->hasRole('admin')) {
            return back()->withErrors(['error' => 'No puedes desactivar un administrador.']);
        }

        $user->active = false;
        $user->save();

        return back()->with('message', 'Usuario desactivado correctamente.');
    }

    public function activar(User $user)
    {
        $user->update(['is_active' => true]);

        return back()->with('message', 'Usuario activado correctamente.');
    }

    public function toggleEstado(User $user)
    {
        if ($user->isAdmin()) {
            return back()->withErrors(['error' => 'No puedes desactivar un administrador.']);
        }

        $user->update([
            'active' => !$user->active,
        ]);

        return back();
    }

}
