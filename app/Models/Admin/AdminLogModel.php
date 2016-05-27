<?php

namespace App\Models\Admin;

class AdminLogModel extends BaseModel
{
    //
    protected $table    = 'adminlog';
    protected $fillable = [
        'uid',
        'username',
        'ip',
        'created',
        'action',
        'data',
        'connection',
        'table'
    ];

}
