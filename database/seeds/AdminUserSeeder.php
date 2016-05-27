<?php

use App\Models\Admin\AdminUserModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Model::unguard();
        AdminUserModel::create([
            'id'       => 1,
            'username' => 'dreamadmin',
            'password' => 'dreamadmin',
            'email'    => 'dreamadmin@dream.cn',
            'created'  => time(),
            'isAdmin'  => 1
        ]);
        AdminUserModel::create([
            'id'       => 2,
            'username' => 'admin',
            'password' => 'admin',
            'email'    => 'admin@dream.cn',
            'created'  => time(),
            'isAdmin'  => 2
        ]);
        AdminUserModel::create([
            'id'       => 3,
            'username' => 'test1',
            'password' => 'test1',
            'email'    => 'test1@dream.cn',
            'created'  => time(),
            'isAdmin'  => 3
        ]);
        AdminUserModel::create([
            'id'       => 4,
            'username' => 'test11',
            'password' => 'test11',
            'email'    => 'test11@dream.cn',
            'created'  => time(),
            'isAdmin'  => 3
        ]);
        AdminUserModel::create([
            'id'       => 5,
            'username' => 'test12',
            'password' => 'test12',
            'email'    => 'test12@dream.cn',
            'created'  => time(),
            'isAdmin'  => 3
        ]);
        AdminUserModel::create([
            'id'       => 6,
            'username' => 'test2',
            'password' => 'test2',
            'email'    => 'test2@dream.cn',
            'created'  => time(),
            'isAdmin'  => 3
        ]);
        AdminUserModel::create([
            'id'       => 7,
            'username' => 'test21',
            'password' => 'test21',
            'email'    => 'test21@dream.cn',
            'created'  => time(),
            'isAdmin'  => 3
        ]);
        AdminUserModel::create([
            'id'       => 8,
            'username' => 'test22',
            'password' => 'test22',
            'email'    => 'test22@dream.cn',
            'created'  => time(),
            'isAdmin'  => 3
        ]);
        Model::reguard();
    }
}
