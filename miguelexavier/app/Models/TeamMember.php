<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name',
        'role',
        'specialization',
        'oab',
        'description',
        'image_url',
        'lattes_url',
        'email',
        'order',
    ];
}
