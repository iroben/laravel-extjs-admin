<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class Role extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * 角色表
         */
        Schema::create('role', function (Blueprint $table) {
            $table->unsignedInteger('id', true);
            $table->string('roleName');
            $table->unsignedInteger('pid');
            $table->unsignedInteger('lval');
            $table->unsignedInteger('rval');
            $table->string('description');
        });
        Schema::create('roleuser', function (Blueprint $table) {
            $table->unsignedInteger('roleId');
            $table->unsignedInteger('userId');
            $table->tinyInteger('isAdmin');
        });
        Schema::create('roleoperation', function (Blueprint $table) {
            $table->unsignedInteger('roleId');
            $table->unsignedInteger('operationId');
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
        Schema::drop('role');
        Schema::drop('roleuser');
        Schema::drop('roleoperation');
    }
}
