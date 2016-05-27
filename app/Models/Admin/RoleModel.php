<?php

namespace App\Models\Admin;

use App\Models\BaseModel;

class RoleModel extends BaseModel
{
    //
    protected $table = 'role';

    protected $appends = ['leaf', 'expanded'];
    protected $fillable = [
        'roleName',
        'description',
        'pid'
    ];

    public function getLeafAttribute()
    {
        /*return isset($this->relations['children']) &&
        $this->relations['children']->isEmpty();*/
        return false;
    }

    public function getExpandedAttribute()
    {
        return isset($this->relations['children']) &&
        !$this->relations['children']->isEmpty();
    }

    public function children()
    {
        return $this->hasMany(RoleModel::class, 'pid')->with(['children.operations']);
    }

    public function operations()
    {
        return $this->belongsToMany(OperationModel::class, 'roleoperation', 'roleId', 'operationId');
    }

    public function users()
    {
        return $this->belongsToMany(AdminUserModel::class, 'roleuser', 'roleId', 'userId');
    }

}
