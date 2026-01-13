<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AboutSection;

class AboutSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AboutSection::create([
            'title' => 'Sobre o Escritório',
            'subtitle' => 'Excelência Jurídica',
            'description' => 'O escritório Miguel & Xavier Advocacia foi fundado com o compromisso de oferecer serviços jurídicos de excelência, pautados pela ética, transparência e dedicação aos nossos clientes. Nossa equipe é formada por profissionais altamente qualificados, com vasta experiência em diversas áreas do Direito.',
            'image_url' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
            'highlights' => [
                [
                    'id' => 1,
                    'icon' => 'Scale',
                    'title' => '15+ Anos',
                    'description' => 'De experiência'
                ],
                [
                    'id' => 2,
                    'icon' => 'Users',
                    'title' => '500+',
                    'description' => 'Clientes atendidos'
                ],
                [
                    'id' => 3,
                    'icon' => 'Award',
                    'title' => '95%',
                    'description' => 'Taxa de sucesso'
                ],
            ],
        ]);
    }
}
