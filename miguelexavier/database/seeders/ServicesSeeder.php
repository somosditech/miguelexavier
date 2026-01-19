<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServicesSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'icon' => 'Briefcase',
                'title' => 'Direito Empresarial',
                'description' => 'Assessoria completa para empresas, incluindo contratos, fusões, aquisições e compliance corporativo.',
                'features' => ['Contratos Comerciais', 'Fusões e Aquisições', 'Compliance', 'Recuperação Judicial'],
                'order' => 1,
            ],
            [
                'icon' => 'Users',
                'title' => 'Direito de Família',
                'description' => 'Acompanhamento sensível e profissional em questões familiares, divórcios, guarda e sucessões.',
                'features' => ['Divórcio', 'Guarda de Filhos', 'Pensão Alimentícia', 'Inventário'],
                'order' => 2,
            ],
            [
                'icon' => 'Scale',
                'title' => 'Direito Trabalhista',
                'description' => 'Defesa de direitos trabalhistas tanto para empregados quanto empregadores.',
                'features' => ['Ações Trabalhistas', 'Acordos', 'Consultoria Preventiva', 'Homologações'],
                'order' => 3,
            ],
            [
                'icon' => 'Home',
                'title' => 'Direito Imobiliário',
                'description' => 'Segurança jurídica em transações imobiliárias, contratos de compra, venda e locação.',
                'features' => ['Compra e Venda', 'Locação', 'Regularização', 'Usucapião'],
                'order' => 4,
            ],
            [
                'icon' => 'FileText',
                'title' => 'Direito Civil',
                'description' => 'Soluções para questões civis diversas, incluindo contratos, responsabilidade civil e indenizações.',
                'features' => ['Contratos', 'Indenizações', 'Responsabilidade Civil', 'Ações Civis'],
                'order' => 5,
            ],
            [
                'icon' => 'Shield',
                'title' => 'Direito Penal',
                'description' => 'Defesa criminal com estratégia sólida e acompanhamento em todas as fases processuais.',
                'features' => ['Defesa Criminal', 'Habeas Corpus', 'Recursos', 'Júri'],
                'order' => 6,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
