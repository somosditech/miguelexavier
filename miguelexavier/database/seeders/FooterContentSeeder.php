<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FooterContent;

class FooterContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FooterContent::create([
            'about_title' => 'Miguel & Xavier Advocacia',
            'about_description' => 'Escritório de advocacia comprometido com a excelência e a defesa dos direitos de nossos clientes.',
            'contact_title' => 'Contato',
            'contact_address' => 'Rua Exemplo, 123 - Centro, Curitiba - PR',
            'contact_phone' => '(41) 8473-7511',
            'contact_email' => 'contato@miguelxavier.adv.br',
            'contact_hours' => 'Segunda a Sexta: 9h às 18h',
            'social_links' => [
                [
                    'name' => 'Lattes',
                    'url' => 'https://lattes.cnpq.br/miguelxavier',
                    'icon' => 'Lattes'
                ],
                [
                    'name' => 'Instagram',
                    'url' => 'https://instagram.com/miguelxavier',
                    'icon' => 'Instagram'
                ],
                [
                    'name' => 'Facebook',
                    'url' => 'https://facebook.com/miguelxavier',
                    'icon' => 'Facebook'
                ],
            ],
            'legal_links' => [
                [
                    'name' => 'Política de Privacidade',
                    'url' => '/privacidade'
                ],
                [
                    'name' => 'Termos de Uso',
                    'url' => '/termos'
                ],
            ],
            'copyright_text' => '© 2026 Miguel & Xavier Advocacia. Todos os direitos reservados.',
        ]);
    }
}
