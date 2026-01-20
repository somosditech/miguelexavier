<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'area_interesse',
        'subject',
        'message',
        'read_at',
        'excluded', 
    ];
    
    protected $casts = [
        'read_at' => 'datetime',
        'excluded' => 'boolean',
    ];
}
