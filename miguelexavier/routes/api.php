<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PublicContentController;
use App\Http\Controllers\ContactController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ============================================
// ROTAS PÚBLICAS (sem autenticação)
// ============================================

// Conteúdo do site
Route::prefix('content')->group(function () {
    Route::get('/', [PublicContentController::class, 'getAll']);
    Route::get('/theme', [PublicContentController::class, 'getTheme']);
    Route::get('/hero', [PublicContentController::class, 'getHero']);
    Route::get('/about', [PublicContentController::class, 'getAbout']);
    Route::get('/services', [PublicContentController::class, 'getServices']);
    Route::get('/team', [PublicContentController::class, 'getTeam']);
    // Route::get('/testimonials', [PublicContentController::class, 'getTestimonials']);
    Route::get('/footer', [PublicContentController::class, 'getFooter']);
    Route::get('/whatsapp', [PublicContentController::class, 'getWhatsapp']);
});

// Formulário de contato
Route::post('/contact', [ContactController::class, 'store']);

// TESTE: Upload sem autenticação (REMOVER DEPOIS)
Route::post('/test-upload', [App\Http\Controllers\Admin\UploadController::class, 'uploadLogo']);
Route::post('/upload-team-photo', [App\Http\Controllers\Admin\UploadController::class, 'uploadTeamPhoto']);

// ============================================
// ROTAS DE AUTENTICAÇÃO
// ============================================

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
    Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('auth:api');
    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:api');
    
    // Recuperação de senha
    Route::post('/password/email', [App\Http\Controllers\Admin\PasswordResetController::class, 'sendResetLink']);
    Route::post('/password/reset', [App\Http\Controllers\Admin\PasswordResetController::class, 'reset']);
});

// ============================================
// ROTAS ADMIN (protegidas por JWT)
// ============================================

Route::middleware('auth:api')->prefix('admin')->group(function () {
    // Upload
    Route::post('/upload/logo', [App\Http\Controllers\Admin\UploadController::class, 'uploadLogo']);
    
    // Theme
    Route::get('/theme', [App\Http\Controllers\Admin\ThemeController::class, 'show']);
    Route::put('/theme', [App\Http\Controllers\Admin\ThemeController::class, 'update']);

    // Hero
    Route::get('/hero', [App\Http\Controllers\Admin\HeroController::class, 'show']);
    Route::put('/hero', [App\Http\Controllers\Admin\HeroController::class, 'update']);
    Route::post('/hero/upload-background', [App\Http\Controllers\Admin\HeroController::class, 'uploadBackground']);

    // About
    Route::get('/about', [App\Http\Controllers\Admin\AboutController::class, 'show']);
    Route::put('/about', [App\Http\Controllers\Admin\AboutController::class, 'update']);
    Route::post('/about/upload-image', [App\Http\Controllers\Admin\AboutController::class, 'uploadImage']);

    // Services (CRUD completo)
    Route::apiResource('services', App\Http\Controllers\Admin\ServiceController::class);

    // Team (CRUD completo)
    Route::apiResource('team', App\Http\Controllers\Admin\TeamMemberController::class);

    // Testimonials (CRUD completo)
    // Route::apiResource('testimonials', App\Http\Controllers\Admin\TestimonialController::class);

    // Footer
    Route::get('/footer', [App\Http\Controllers\Admin\FooterController::class, 'show']);
    Route::put('/footer', [App\Http\Controllers\Admin\FooterController::class, 'update']);

    // Contact Messages
    Route::get('/contact-messages', [App\Http\Controllers\Admin\ContactMessageController::class, 'index']);
    Route::get('/contact-messages/count-unread', [App\Http\Controllers\Admin\ContactMessageController::class, 'countUnread']);
    Route::get('/contact-messages/stats', [App\Http\Controllers\Admin\ContactMessageController::class, 'getStats']);
    Route::get('/contact-messages/{id}', [App\Http\Controllers\Admin\ContactMessageController::class, 'show']);
    Route::put('/contact-messages/{id}/mark-read', [App\Http\Controllers\Admin\ContactMessageController::class, 'markAsRead']);
    Route::delete('/contact-messages/{id}', [App\Http\Controllers\Admin\ContactMessageController::class, 'delete']);

    // Image Upload
    Route::post('/upload/image', [App\Http\Controllers\Admin\ImageUploadController::class, 'upload']);
    Route::delete('/upload/image', [App\Http\Controllers\Admin\ImageUploadController::class, 'delete']);
    Route::get('/upload/images', [App\Http\Controllers\Admin\ImageUploadController::class, 'list']);

    // Profile Management
    Route::get('/profile', [App\Http\Controllers\Admin\ProfileController::class, 'show']);
    Route::put('/profile', [App\Http\Controllers\Admin\ProfileController::class, 'update']);
    Route::post('/profile/upload-photo', [App\Http\Controllers\Admin\ProfileController::class, 'uploadPhoto']);
    Route::post('/profile/verify-update', [App\Http\Controllers\Admin\ProfileController::class, 'verifyAndUpdate']);

    // WhatsApp Settings
    Route::get('/whatsapp', [App\Http\Controllers\Admin\WhatsAppController::class, 'index']);
    Route::post('/whatsapp', [App\Http\Controllers\Admin\WhatsAppController::class, 'store']);
    Route::put('/whatsapp', [App\Http\Controllers\Admin\WhatsAppController::class, 'update']);
});
