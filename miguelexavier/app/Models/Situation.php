<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Situation extends Model
{
    protected $table = 'situations';

    protected $fillable = [
        'title',
        'content',
        'message',
        'cta_button_text',
    ];

    protected $casts = [
        'content' => 'array',
    ];
}
