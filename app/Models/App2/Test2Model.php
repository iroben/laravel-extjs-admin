<?php
/**
 * Created by PhpStorm.
 * User: LiuBin
 * Date: 2016/5/26
 * Time: 10:02
 */

namespace App\Models\App2;


use App\Models\App2Model;

class Test2Model extends App2Model
{
    protected $table = 'test2';
    protected $fillable = [
        'username2',
        'age2',
        'sex2'
    ];
}