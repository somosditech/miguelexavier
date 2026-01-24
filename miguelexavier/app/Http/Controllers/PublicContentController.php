<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use App\Models\HeroSection;
use App\Models\AboutSection;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\WhatsAppSetting;
use App\Models\FooterContent;

class PublicContentController extends Controller
{
    /**
     * Retorna todo o conteúdo do site de uma vez
     */
    public function getAll()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'theme' => $this->mapTheme(Theme::first()),
                'hero' => $this->mapHero(HeroSection::first()),
                'about' => $this->mapAbout(AboutSection::first()),
                'services' => Service::orderBy('order')->get()->map(fn($s) => $this->mapService($s)),
                'team' => TeamMember::orderBy('order')->get()->map(fn($t) => $this->mapTeamMember($t)),
                'testimonials' => Testimonial::orderBy('order')->get()->map(fn($t) => $this->mapTestimonial($t)),
                'footer' => $this->mapFooter(FooterContent::first()),
                'whatsapp' => $this->mapWhatsApp(WhatsAppSetting::first()),
            ]
        ]);
    }

    /**
     * Retorna apenas o tema (cores)
     */
    public function getTheme()
    {
        return response()->json([
            'success' => true,
            'data' => $this->mapTheme(Theme::first())
        ]);
    }

    /**
     * Retorna seção Hero
     */
    public function getHero()
    {
        return response()->json([
            'success' => true,
            'data' => $this->mapHero(HeroSection::first())
        ]);
    }

    /**
     * Retorna seção About
     */
    public function getAbout()
    {
        return response()->json([
            'success' => true,
            'data' => $this->mapAbout(AboutSection::first())
        ]);
    }

    /**
     * Retorna todos os serviços
     */
    public function getServices()
    {
        return response()->json([
            'success' => true,
            'data' => Service::orderBy('order')->get()->map(fn($service) => $this->mapService($service))
        ]);
    }

    /**
     * Retorna todos os membros da equipe
     */
    public function getTeam()
    {
        return response()->json([
            'success' => true,
            'data' => TeamMember::orderBy('order')->get()->map(fn($member) => $this->mapTeamMember($member))
        ]);
    }

    /**
     * Retorna todos os depoimentos
     */
    public function getTestimonials()
    {
        return response()->json([
            'success' => true,
            'data' => Testimonial::orderBy('order')->get()->map(fn($testimonial) => $this->mapTestimonial($testimonial))
        ]);
    }

    /**
     * Retorna conteúdo do footer
     */
    public function getFooter()
    {
        return response()->json([
            'success' => true,
            'data' => $this->mapFooter(FooterContent::first())
        ]);
    }

    /**
     * Retorna conteúdo do WhatsApp
     */
    public function getWhatsApp()
    {
        return response()->json([
            'success' => true,
            'data' => $this->mapWhatsApp(WhatsAppSetting::first())
        ]);
    }

    // ============================================
    // MÉTODOS DE MAPEAMENTO (snake_case → camelCase)
    // ============================================

    /**
     * Mapeia Theme para camelCase
     */
    private function mapTheme($theme)
    {
        if (!$theme)
            return null;

        return [
            'primary' => $theme->primary_color,
            'secondary' => $theme->secondary_color,
            'accent' => $theme->accent_color,
            'background' => $theme->background_color,
            'backgroundDark' => $theme->background_dark,
            'backgroundLight' => $theme->background_light,
            'textPrimary' => $theme->text_primary,
            'textSecondary' => $theme->text_secondary,
            'textLight' => $theme->text_light,
            'logoUrl' => $theme->logo_url,
        ];
    }

    /**
     * Mapeia HeroSection para camelCase
     */
    private function mapHero($hero)
    {
        if (!$hero)
            return null;

        // Se background_image_url não começa com http, é um caminho local do storage
        $backgroundImage = $hero->background_image_url;
        if ($backgroundImage && !str_starts_with($backgroundImage, 'http')) {
            $backgroundImage = asset('storage/' . $backgroundImage);
        }

        return [
            'title' => $hero->title,
            'subtitle' => $hero->subtitle,
            'description' => $hero->description,
            'backgroundImage' => $backgroundImage,
            'ctaButtons' => [
                [
                    'text' => $hero->cta_button_text,
                    'href' => $hero->cta_button_href,
                    'primary' => true
                ]
            ]
        ];
    }

    /**
     * Mapeia AboutSection para camelCase
     */
    private function mapAbout($about)
    {
        if (!$about)
            return null;

        // Se image_url não começa com http, é um caminho local do storage
        $imageUrl = $about->image_url;
        if ($imageUrl && !str_starts_with($imageUrl, 'http')) {
            $imageUrl = asset('storage/' . $imageUrl);
        }

        return [
            'title' => $about->title,
            'subtitle' => $about->subtitle,
            'description' => $about->description,
            'imageUrl' => $imageUrl,
            'highlights' => $about->highlights ?? [],
        ];
    }

    /**
     * Mapeia Service para camelCase
     */
    private function mapService($service)
    {
        return [
            'id' => $service->id,
            'icon' => $service->icon,
            'title' => $service->title,
            'description' => $service->description,
            'features' => $service->features ?? [],
        ];
    }

    /**
     * Mapeia TeamMember para camelCase
     */
    private function mapTeamMember($member)
    {
        // Se image_url não começa com http, é um caminho local do storage
        $imageUrl = $member->image_url;
        if ($imageUrl && !str_starts_with($imageUrl, 'http')) {
            $imageUrl = asset('storage/' . $imageUrl);
        }

        return [
            'id' => $member->id,
            'name' => $member->name,
            'role' => $member->role,
            'specialization' => $member->specialization,
            'oab' => $member->oab,
            'description' => $member->description,
            'image' => $imageUrl,
            'social' => [
                'lattes' => $member->lattes_url,
                'email' => $member->email,
            ]
        ];
    }

    /**
     * Mapeia Testimonial para camelCase
     */
    private function mapTestimonial($testimonial)
    {
        return [
            'id' => $testimonial->id,
            'name' => $testimonial->name,
            'role' => $testimonial->role,
            'text' => $testimonial->text,
        ];
    }

    /**
     * Mapeia FooterContent para camelCase
     */
    private function mapFooter($footer)
    {
        if (!$footer)
            return null;

        return [
            'about' => [
                'title' => $footer->about_title,
                'description' => $footer->about_description,
            ],
            'contact' => [
                'title' => $footer->contact_title,
                'address' => $footer->contact_address,
                'phone' => $footer->contact_phone,
                'email' => $footer->contact_email,
                'hours' => $footer->contact_hours,
            ],
            'socialLinks' => $footer->social_links ?? [],
            'legalLinks' => $footer->legal_links ?? [],
            'copyright' => $footer->copyright_text,
            'privacy_policy_content' => $footer->privacy_policy_content,
            'terms_of_use_content' => $footer->terms_of_use_content,
        ];
    }

    /**
     * Mapeia WhatsAppSetting para camelCase
     */
    private function mapWhatsApp($whatsapp)
    {
        if (!$whatsapp)
            return null;

        return [
            'phoneNumber' => $whatsapp->phone_number,
            'predefinedMessage' => $whatsapp->predefined_message,
        ];
    }
}
