<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceWork extends Model
{
    protected $table = 'service_work';

    protected $fillable = [
        'title',
        'content',
        'cta_button_text',
    ];

    protected $casts = [
        'content' => 'array',
    ];
}
