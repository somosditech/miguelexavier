<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HeroSection;

class HeroSectionSeeder extends Seeder
{
    public function run(): void
    {
        HeroSection::create([
            'title' => 'Excelência Jurídica',
            'subtitle' => 'Soluções Personalizadas',
            'description' => 'Mais de 20 anos de experiência oferecendo assessoria jurídica de excelência com foco em resultados e relacionamento próximo com nossos clientes.',
            'background_image_url' => 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80',
            'cta_button_text' => 'Fale com um Advogado',
            'cta_button_href' => '#contact',
        ]);
    }
}
