<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class AdminLog extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('adminlog', function (Blueprint $table) {
            $table->unsignedInteger('id', true);
            $table->unsignedInteger('uid')->comment('用户ID');
            $table->string('username')->comment('用户名');
            $table->string('ip')->comment('IP地址');
            $table->unsignedInteger('created')->comment('操作时间');
            $table->string('connection')->nullable()->comment('连接名称');
            $table->string('table')->comment('操作表名');
            $table->string('action')->comment('操作动作');
            $table->text('data')->comment('操作的数据');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('adminlog');
    }
}
