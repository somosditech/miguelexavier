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
                'theme' => Theme::first(),
                'hero' => HeroSection::first(),
                'about' => AboutSection::first(),
                'services' => Service::orderBy('order')->get(),
                'team' => TeamMember::orderBy('order')->get(),
                'testimonials' => Testimonial::orderBy('order')->get(),
                'footer' => FooterContent::first(),
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
            'data' => Theme::first()
        ]);
    }

    /**
     * Retorna seção Hero
     */
    public function getHero()
    {
        return response()->json([
            'success' => true,
            'data' => HeroSection::first()
        ]);
    }

    /**
     * Retorna seção About
     */
    public function getAbout()
    {
        return response()->json([
            'success' => true,
            'data' => AboutSection::first()
        ]);
    }

    /**
     * Retorna todos os serviços
     */
    public function getServices()
    {
        return response()->json([
            'success' => true,
            'data' => Service::orderBy('order')->get()
        ]);
    }

    /**
     * Retorna todos os membros da equipe
     */
    public function getTeam()
    {
        return response()->json([
            'success' => true,
            'data' => TeamMember::orderBy('order')->get()
        ]);
    }

    /**
     * Retorna todos os depoimentos
     */
    public function getTestimonials()
    {
        return response()->json([
            'success' => true,
            'data' => Testimonial::orderBy('order')->get()
        ]);
    }

    /**
     * Retorna conteúdo do footer
     */
    public function getFooter()
    {
        return response()->json([
            'success' => true,
            'data' => FooterContent::first()
        ]);
    }
}
