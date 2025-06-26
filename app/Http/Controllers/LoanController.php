<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Loan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class LoanController extends Controller
{
    public function index()
{
    // Actualizar los préstamos vencidos del usuario
    Loan::where('user_id', Auth::id())
        ->where('status', 'active')
        ->whereDate('end_date', '<', Carbon::today())
        ->update(['status' => 'completed']);

    // Obtener préstamos actualizados
    $loans = Loan::with(['book.author'])
        ->where('user_id', Auth::id())
        ->orderByDesc('created_at')
        ->paginate(5);

    return Inertia::render('loans/index', [
        'loans' => $loans,
    ]);
}


    public function create(Book $book)
    {
        return Inertia::render('loans/create', [
            'book' => $book->load('author'),
        ]);
    }

    public function store(Request $request, Book $book)
    {
        $validated = $request->validate([
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
        ]);

        $startDate = Carbon::parse($validated['start_date']);
        $endDate = Carbon::parse($validated['end_date']);
        $days = $startDate->diffInDays($endDate);
        $totalPrice = $days * $book->price_per_day;

        $loan = Loan::create([
            'user_id' => Auth::id(),
            'book_id' => $book->id,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'days' => $days,
            'total_price' => $totalPrice,
            'status' => 'pending',
        ]);

        // Aquí se integraría con el sistema de pagos
        // Por ahora, simularemos un pago exitoso
        $loan->update(['status' => 'active']);

        return redirect()->route('loans.success', $loan)
            ->with('message', 'Préstamo creado exitosamente');
    }

    public function success(Loan $loan)
    {
        return Inertia::render('loans/success', [
            'loan' => $loan->load(['book', 'book.author']),
        ]);
    }

    public function show(Loan $loan)
    {
        return Inertia::render('Loans/show', [
            'loan' => [
                'id' => $loan->id,
                'fecha_inicio' => $loan->fecha_inicio->toIso8601String(),
                'fecha_fin' => $loan->fecha_fin->toIso8601String(),
                'libro' => $loan->libro->titulo, // solo si la relación existe
            ],
        ]);
    }
}
