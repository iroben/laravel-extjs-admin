<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class Operation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * 后台功能模块表
         */
        Schema::create('operation', function (Blueprint $table) {

            $table->unsignedInteger('id', true);
            $table->string('text');
            $table->string('iconCls')->nullable();
            $table->string('rbnamespace')->nullable();
            $table->string('rbclass')->nullable();
            $table->string('method')->nullable();
            $table->string('xtype')->nullable();
            $table->tinyInteger('isMenu')->default(0);
            $table->unsignedInteger('order')->nullable();
            $table->unsignedInteger('pid');
            //"text":"Home","iconCls":"x-fa fa-home","expanded":true,
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
        Schema::drop('operation');
    }
}
