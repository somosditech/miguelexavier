<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    protected $table = 'theme';
    
    protected $fillable = [
        'primary_color',
        'secondary_color',
        'accent_color',
        'background_color',
        'background_dark',
        'background_light',
        'text_primary',
        'text_secondary',
        'text_light',
    ];
}
