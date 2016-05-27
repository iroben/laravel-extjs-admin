<?php
/**
 * Created by PhpStorm.
 * User: LiuBin
 * Date: 2016/5/26
 * Time: 18:43
 */

namespace App\Http\Controllers\App2;


use App\Http\Controllers\Controller;
use App\Models\App2\Test2Model;

class Test2Controller extends Controller
{
    public function __construct(Test2Model $model)
    {
        $this->model = $model;
    }

}