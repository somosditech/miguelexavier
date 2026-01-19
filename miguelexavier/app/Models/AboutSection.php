<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutSection extends Model
{
    protected $table = 'about_section';

    protected $fillable = [
        'title',
        'subtitle',
        'description',
        'image_url',
        'highlights',
    ];

    protected $casts = [
        'highlights' => 'array',
    ];
}
