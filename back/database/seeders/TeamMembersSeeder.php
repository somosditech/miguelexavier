<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TeamMember;

class TeamMembersSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            [
                'name' => 'Dr. David Miguel',
                'role' => 'Sócio Fundador',
                'specialization' => 'Direito Empresarial e Civil',
                'oab' => 'OAB/SP 123.456',
                'description' => 'Mais de 25 anos de experiência em direito empresarial, com atuação destacada em fusões e aquisições.',
                'image_url' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
                'linkedin_url' => 'https://linkedin.com/in/david-miguel',
                'email' => 'david@miguelxavier.adv.br',
                'order' => 1,
            ],
            [
                'name' => 'Dra. Ariane Xavier',
                'role' => 'Sócia Fundadora',
                'specialization' => 'Direito de Família e Sucessões',
                'oab' => 'OAB/SP 234.567',
                'description' => 'Especialista em direito de família com abordagem humanizada e foco em soluções consensuais.',
                'image_url' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
                'linkedin_url' => 'https://linkedin.com/in/ariane-xavier',
                'email' => 'ariane@miguelxavier.adv.br',
                'order' => 2,
            ],
        ];

        foreach ($members as $member) {
            TeamMember::create($member);
        }
    }
}
