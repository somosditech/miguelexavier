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
        Schema::create('theme', function (Blueprint $table) {
            $table->id();
            $table->string('primary_color')->default('#771220');
            $table->string('secondary_color')->default('#CFA750');
            $table->string('accent_color')->default('#C49B63');
            $table->string('background_color')->default('#f5f1eb');
            $table->string('background_dark')->default('#2a3342');
            $table->string('background_light')->default('#ffffff');
            $table->string('text_primary')->default('#2a3342');
            $table->string('text_secondary')->default('#6b7280');
            $table->string('text_light')->default('#ffffff');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('theme');
    }
};
