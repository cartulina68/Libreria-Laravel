<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookDigitalAccess extends Model
{
    protected $fillable = [
        'loan_id',
        'accessed_at',
        'ip_address',
        'device'
    ];

    public function loan()
    {
        return $this->belongsTo(Loan::class);
    }
}
