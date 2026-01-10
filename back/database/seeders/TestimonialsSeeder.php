<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Testimonial;

class TestimonialsSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Carlos Silva',
                'role' => 'Empresário',
                'text' => 'Profissionais extremamente competentes. Resolveram minha questão empresarial com agilidade e eficiência. Recomendo!',
                'order' => 1,
            ],
            [
                'name' => 'Maria Santos',
                'role' => 'Arquiteta',
                'text' => 'Atendimento humanizado e profissional. Me senti acolhida durante todo o processo do meu divórcio.',
                'order' => 2,
            ],
            [
                'name' => 'João Oliveira',
                'role' => 'Comerciante',
                'text' => 'Excelente assessoria jurídica! Conseguiram reverter uma situação que parecia impossível.',
                'order' => 3,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
