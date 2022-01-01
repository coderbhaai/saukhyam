<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->integer('type');
            $table->string('name');
            $table->integer('wprice');
            $table->integer('dprice');
            $table->mediumText('images');
            $table->mediumText('short_description')->nullable();
            $table->text('long_description')->nullable();
            $table->mediumText('dimension')->nullable();
            $table->integer('status');
            $table->integer('discount');
            $table->integer('distype');
            $table->integer('mov')->default(1);
            $table->mediumText('language');
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
        Schema::dropIfExists('products');
    }
}
