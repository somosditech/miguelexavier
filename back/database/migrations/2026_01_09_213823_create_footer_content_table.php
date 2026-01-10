<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('footer_content', function (Blueprint $table) {
            $table->id();
            $table->string('about_title');
            $table->text('about_description');
            $table->string('contact_title');
            $table->string('contact_address')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_hours')->nullable();
            $table->json('social_links')->nullable(); // Array de links sociais
            $table->json('legal_links')->nullable(); // Array de links legais
            $table->string('copyright_text');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('footer_content');
    }
};
