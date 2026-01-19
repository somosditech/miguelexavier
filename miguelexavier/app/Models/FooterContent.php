<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FooterContent extends Model
{
    protected $table = 'footer_content';
    
    protected $fillable = [
        'about_title',
        'about_description',
        'contact_title',
        'contact_address',
        'contact_phone',
        'contact_email',
        'contact_hours',
        'social_links',
        'legal_links',
        'copyright_text',
        'privacy_policy_content',
        'terms_of_use_content',
    ];
    
    protected $casts = [
        'social_links' => 'array',
        'legal_links' => 'array',
    ];
}
