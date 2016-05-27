<?php

namespace App\Models\Admin;

use App\Models\BaseModel;

class OperationModel extends BaseModel
{
    //
    protected $table = 'operation';
    protected $fillable = [
        'text',
        'iconCls',
        'rbnamespace',
        'rbclass',
        'method',
        'xtype',
        'pid',
        'isMenu',
        'order'
    ];

    protected $appends = ['expanded', 'leaf'];


    public function getExpandedAttribute()
    {
        /**
         * 功能列表的最后一级不显示出来
         */
        return (isset($this->relations['children']) &&
            !$this->relations['children']->isEmpty() &&
            isset($this->relations['children'][0]->relations['children']) &&
            !$this->relations['children'][0]->relations['children']->isEmpty())
        || (isset($this->relations['menus']) &&
            !$this->relations['menus']->isEmpty());
    }

    public function getLeafAttribute()
    {
        /*return (isset($this->relations['children']) && $this->relations['children']->isEmpty()) ||
        (isset($this->relations['menus']) && $this->relations['menus']->isEmpty());*/
        return false;
    }

    public function children()
    {
        return $this->hasMany(OperationModel::class, 'pid')->latest('order')->with(['children']);
    }

    public function scopeRoot($query)
    {
        return $query->where('pid', 0)->latest('order');
    }

    public function menus()
    {
        return $this->hasMany(OperationModel::class, 'pid')
            ->latest('order')->with(['menus'])->where('isMenu', 1);
    }

    public function roles()
    {
        return $this->belongsToMany(RoleModel::class,
            'roleoperation', 'operationId', 'roleId');
    }

}
