<?php
/**
 * Created by PhpStorm.
 * User: LiuBin
 * Date: 2016/5/26
 * Time: 10:02
 */

namespace App\Models\App1;


use App\Models\App1Model;

class Test1Model extends App1Model
{
    protected $table = 'test1';
    protected $fillable = [
        'username1',
        'age1',
        'sex1'
    ];
}