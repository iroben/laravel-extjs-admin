<?php

namespace App\Models\Admin;

use App\Models\BaseModel;

class AdminUserModel extends BaseModel
{
    //
    protected $table = 'adminuser';
    protected $appends = ['createDate'];
    protected $fillable = [
        'username',
        'password',
        'email',
        'created',
        'isAdmin'
    ];

    const ADMIN = 2;

    const SUPER_ADMIN = 1;

    public function getCreateDateAttribute()
    {
        return date('Y-m-d H:i:s', $this->getAttributeFromArray('created'));
    }

    public function setPasswordAttribute($val)
    {
        $this->attributes['password'] = $this->getEncryptString($val);
    }

    public function getEncryptString($val)
    {
        return hash_hmac('md5', $val, env('ENCRYPT_KEY'));
    }

    public function roles()
    {
        return $this->belongsToMany(RoleModel::class, 'roleuser', 'userId', 'roleId')
            ->withPivot('isAdmin');
    }

    public function isAdmin()
    {
        return $this->isAdmin == self::ADMIN;
    }

    public function isSuperAdmin()
    {
        return $this->isAdmin == self::SUPER_ADMIN;
    }

    public function setIsAdminAttribute($val)
    {
        if ($this->username !== 'dreamadmin') {
            $this->attributes['isAdmin'] = $val == 1 ? 3 : $val;
        } else {
            $this->attributes['isAdmin'] = $val;
        }

    }
}
