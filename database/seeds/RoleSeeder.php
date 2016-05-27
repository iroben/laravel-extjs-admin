<?php

use App\Models\Admin\RoleModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $roles = [
            [
                'id'          => 1,
                'roleName'    => 'APP1超级管理员',
                'description' => 'APP1超级管理员',
                'users'       => [3],
                'child'       => [
                    [
                        'id'          => 2,
                        'roleName'    => 'APP1管理员',
                        'description' => 'APP1管理员',
                        'users'       => [4],
                    ],
                    [
                        'id'          => 3,
                        'roleName'    => 'APP1用户',
                        'description' => 'APP1用户',
                        'users'       => [5],
                    ]
                ]
            ],
            [
                'id'          => 4,
                'roleName'    => 'APP2超级管理员',
                'description' => 'APP2超级管理员',
                'users'       => [6],
                'child'       => [
                    [
                        'id'          => 5,
                        'roleName'    => 'APP2管理员',
                        'description' => 'APP2管理员',
                        'users'       => [7],
                    ],
                    [
                        'id'          => 6,
                        'roleName'    => 'APP2用户',
                        'description' => 'APP2用户',
                        'users'       => [8],
                    ]
                ]
            ]
        ];
        foreach ($roles as $role) {
            $child = $role['child'];
            unset($role['child']);
            $role['pid'] = 0;
            $model = RoleModel::create($role);
            foreach ($child as $val) {
                $val['pid'] = $model->id;
                $model1 = RoleModel::create($val);
                $model1->users()->sync($val['users']);
            }
            if (isset($role['users'])) {
                $model->users()->sync($role['users']);
            }
        }
    }
}
