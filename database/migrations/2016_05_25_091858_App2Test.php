<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class App2Test extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::connection('app2')->create('test2', function (Blueprint $table) {
            $table->unsignedInteger('id', true);
            $table->string('username2');
            $table->tinyInteger('age2');
            $table->tinyInteger('sex2');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::connection('app2')->drop('test2');
    }
}
