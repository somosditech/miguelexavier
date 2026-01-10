<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSection extends Model
{
    protected $table = 'hero_section';
    
    protected $fillable = [
        'title',
        'subtitle',
        'description',
        'background_image_url',
        'cta_button_text',
        'cta_button_href',
    ];
}
