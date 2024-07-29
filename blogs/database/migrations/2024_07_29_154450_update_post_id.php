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
        // Drop the foreign key constraint
        Schema::table('post_read_times', function (Blueprint $table) {
            $table->dropForeign(['post_id']);
        });

        // Alter the column types
        Schema::table('posts', function (Blueprint $table) {
            $table->string('id')->change();
        });

        Schema::table('post_read_times', function (Blueprint $table) {
            $table->string('post_id')->change();
        });

        // Re-add the foreign key constraint
        Schema::table('post_read_times', function (Blueprint $table) {
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the foreign key constraint
        Schema::table('post_read_times', function (Blueprint $table) {
            $table->dropForeign(['post_id']);
        });

        // Revert the column types
        Schema::table('posts', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->change();
        });

        Schema::table('post_read_times', function (Blueprint $table) {
            $table->unsignedBigInteger('post_id')->change();
        });

        // Re-add the foreign key constraint
        Schema::table('post_read_times', function (Blueprint $table) {
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
        });
    }
};
