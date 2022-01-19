<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->integer('userId');
            $table->string('name');
            $table->string('gender');
            $table->string('residence');
            $table->string('email');
            $table->string('phone');
            $table->string('occupation');
            $table->string('education');
            $table->string('languages');
            $table->string('country');
            $table->string('state');
            $table->string('city');
            $table->string('area');
            $table->string('pin');
            $table->string('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profiles');
    }
}
