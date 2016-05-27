<?php
/**
 * Created by PhpStorm.
 * User: LiuBin
 * Date: 2016/5/26
 * Time: 18:43
 */

namespace App\Http\Controllers\App1;


use App\Http\Controllers\Controller;
use App\Models\App1\Test1Model;

class Test1Controller extends Controller
{
    public function __construct(Test1Model $model)
    {
        $this->model = $model;
    }
}