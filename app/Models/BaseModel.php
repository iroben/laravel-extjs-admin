<?php
/**
 * Created by PhpStorm.
 * User: LiuBin
 * Date: 2015/9/18
 * Time: 16:17
 */

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{
    public        $timestamps      = false;
    public static $snakeAttributes = false;

    const   TOTAL_ORDER = 10000000;

    public function getOrderAttribute($val)
    {
        return $val ? self::TOTAL_ORDER - $val : '';
    }

    public function setOrderAttribute($val)
    {
        if ($val) {
            $this->attributes['order'] = self::TOTAL_ORDER - $val;
        } else {
            $this->attributes['order'] = null;
        }
    }

}