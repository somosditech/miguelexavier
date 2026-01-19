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
        Schema::table('footer_content', function (Blueprint $table) {
            $table->longText('privacy_policy_content')->nullable();
            $table->longText('terms_of_use_content')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('footer_content', function (Blueprint $table) {
            $table->dropColumn(['privacy_policy_content', 'terms_of_use_content']);
        });
    }
};
