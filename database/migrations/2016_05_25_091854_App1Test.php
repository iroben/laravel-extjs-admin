<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class App1Test extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::connection('app1')->create('test1', function (Blueprint $table) {
            $table->unsignedInteger('id', true);
            $table->string('username1');
            $table->tinyInteger('age1');
            $table->tinyInteger('sex1');
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
        Schema::connection('app1')->drop('test1');
    }
}
