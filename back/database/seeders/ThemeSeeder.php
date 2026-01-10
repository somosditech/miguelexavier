<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Theme;

class ThemeSeeder extends Seeder
{
    public function run(): void
    {
        Theme::create([
            'primary_color' => '#771220',
            'secondary_color' => '#CFA750',
            'accent_color' => '#C49B63',
            'background_color' => '#f5f1eb',
            'background_dark' => '#2a3342',
            'background_light' => '#ffffff',
            'text_primary' => '#2a3342',
            'text_secondary' => '#6b7280',
            'text_light' => '#ffffff',
        ]);
    }
}
