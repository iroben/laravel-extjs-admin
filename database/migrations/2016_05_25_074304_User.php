<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class User extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('adminuser', function (Blueprint $table) {
            $table->unsignedInteger('id', true);
            $table->string('username')->unique();
            $table->string('password');
            $table->string('email');
            $table->tinyInteger('isAdmin');/*是否是，1 超级管理员 2 管理员 3 普通用户*/
            $table->unsignedInteger('created');
            $table->unsignedInteger('verifyNumber');/*效验数字，当用户权限修改后，修改该字段值*/
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
        Schema::drop('adminuser');
    }
}
