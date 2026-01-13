<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Theme;
use App\Models\HeroSection;
use App\Models\AboutSection;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Testimonial;
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
        ];
    }

    /**
     * Mapeia HeroSection para camelCase
     */
    private function mapHero($hero)
    {
        if (!$hero)
            return null;

        return [
            'title' => $hero->title,
            'subtitle' => $hero->subtitle,
            'description' => $hero->description,
            'backgroundImage' => $hero->background_image_url,
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

        return [
            'title' => $about->title,
            'subtitle' => $about->subtitle,
            'description' => $about->description,
            'imageUrl' => $about->image_url,
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
        return [
            'id' => $member->id,
            'name' => $member->name,
            'role' => $member->role,
            'specialization' => $member->specialization,
            'oab' => $member->oab,
            'description' => $member->description,
            'imageUrl' => $member->image_url,
            'social' => [
                'linkedin' => $member->linkedin_url,
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
        ];
    }
}
