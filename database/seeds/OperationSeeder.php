<?php

use App\Models\Admin\OperationModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class OperationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        $this->iteratorOperation($this->root());
        Model::reguard();
    }

    private function iteratorOperation($operations, $pid = 0)
    {
        foreach ($operations as $operation) {
            $roles = [];
            if (isset($operation['roles'])) {
                $roles = $operation['roles'];
            }
            $children = isset($operation['children']) ? $operation['children'] : '';
            unset($operation['children'], $operation['roles']);
            $operation['pid'] = $pid;
            $model = OperationModel::create($operation);
            if (!empty($roles)) {
                $model->roles()->sync($roles);
            }
            if ($children) {
                $this->iteratorOperation($children, $model->id);
            }
        }

    }

    private function root()
    {
        return [
            [
                "text"        => "应用1管理",
                "iconCls"     => null,
                "rbnamespace" => 'App\\Http\\Controllers\\App1',
                "rbclass"     => null,
                "method"      => null,
                "xtype"       => null,
                "isMenu"      => 1,
                "roles"       => [2, 3],
                "children"    => $this->app1()
            ], [
                "text"        => "应用2管理",
                "iconCls"     => null,
                "rbnamespace" => 'App\\Http\\Controllers\\App2',
                "rbclass"     => null,
                "method"      => null,
                "xtype"       => null,
                "isMenu"      => 1,
                "roles"       => [5, 6],
                "children"    => $this->app2()
            ], [
                "text"        => "后台管理",
                "iconCls"     => null,
                "rbnamespace" => 'App\\Http\\Controllers\\Admin',
                "rbclass"     => null,
                "method"      => null,
                "xtype"       => null,
                "isMenu"      => 1,
                "children"    => $this->adminInfo()
            ]
        ];
    }

    private function app1()
    {

        return [
            [
                "text"        => "应用1",
                "iconCls"     => null,
                "rbnamespace" => 'App\\Http\\Controllers\\App1',
                "rbclass"     => null,
                "method"      => null,
                "xtype"       => "test1",
                "isMenu"      => 1,
                "roles"       => [2, 3],
                "children"    => $this->app1Info()
            ]
        ];
    }

    private function app2()
    {
        return [
            [
                "text"        => "应用2",
                "iconCls"     => null,
                "rbnamespace" => 'App\\Http\\Controllers\\App1',
                "rbclass"     => null,
                "method"      => null,
                "xtype"       => "test2",
                "isMenu"      => 1,
                "roles"       => [5, 6],
                "children"    => $this->app2Info()
            ]
        ];
    }


    /**
     * @return array
     */
    private function adminInfo()
    {
        return [
            [
                "text"        => "功能管理",
                "iconCls"     => null,
                "rbnamespace" => 'App\\Http\\Controllers\\Admin',
                "rbclass"     => null,
                "method"      => null,
                "xtype"       => "adminoperation",
                "isMenu"      => 1,
                "children"    => $this->operationInfo(8)
            ], [
                "text"        => "用户管理",
                "iconCls"     => null,
                "rbnamespace" => 'App\\Http\\Controllers\\Admin',
                "rbclass"     => null,
                "method"      => null,
                "xtype"       => "adminuser",
                "isMenu"      => 1,
                "children"    => $this->userInfo(9)
            ], [
                "text"        => "角色管理",
                "iconCls"     => null,
                "rbnamespace" => 'App\\Http\\Controllers\\Admin',
                "rbclass"     => null,
                "method"      => null,
                "xtype"       => "adminrole",
                "isMenu"      => 1,
                "children"    => $this->roleInfo(10)
            ]
        ];
    }


    /**
     * @return array
     */
    private function operationInfo()
    {
        return [
            [
                "text"        => "浏览",
                "iconCls"     => "app-add",
                "rbnamespace" => "App\\Http\\Controllers\\Admin",
                "rbclass"     => "OperationController",
                "method"      => "index",
                "xtype"       => null,
                "isMenu"      => 0
            ],
            [
                "text"        => "添加",
                "iconCls"     => "app-add",
                "rbnamespace" => "App\\Http\\Controllers\\Admin",
                "rbclass"     => "OperationController",
                "method"      => "store",
                "xtype"       => null,
                "isMenu"      => 0
            ],
            [
                "text"        => "编辑",
                "iconCls"     => "app-edit",
                "rbnamespace" => "App\\Http\\Controllers\\Admin",
                "rbclass"     => "OperationController",
                "method"      => "update",
                "xtype"       => null,
                "isMenu"      => 0
            ],
            [
                "text"        => "删除",
                "iconCls"     => "app-remove",
                "rbnamespace" => "App\\Http\\Controllers\\Admin",
                "rbclass"     => "OperationController",
                "method"      => "destroy",
                "xtype"       => null,
                "isMenu"      => 0
            ]
        ];
    }

    /**
     * @return array
     */
    private function userInfo()
    {
        return [
            [
                "text"        => "浏览",
                "iconCls"     => "app-add",
                "rbnamespace" => "App\\Http\\Controllers\\Admin",
                "rbclass"     => "UserController",
                "method"      => "index",
                "xtype"       => null,
                "isMenu"      => 0
            ], [
                "text"        => "添加",
                "iconCls"     => "app-add",
                "rbnamespace" => "App\\Http\\Controllers\\Admin",
                "rbclass"     => "UserController",
                "method"      => "store",
                "xtype"       => null,
                "isMenu"      => 0
            ],
            [
                "text"        => "编辑",
                "iconCls"     => "app-edit",
                "rbnamespace" => "App\\Http\\Controllers\\Admin",
                "rbclass"     => "UserController",
                "method"      => "update",
                "xtype"       => null,
                "isMenu"      => 0
            ],
            [
                "text"        => "删除",
                "iconCls"     => "app-remove",
                "rbnamespace" => "App\\Http\\Controllers\\Admin",
                "rbclass"     => "UserController",
                "method"      => "destroy",
                "xtype"       => null,
                "isMenu"      => 0
            ]
        ];
    }

    /**
     * @return array
     */
    private function roleInfo()
    {
        return [
            [
                "text"        => "浏览",
                "iconCls"     => "app-add",
                "rbnamespace" => "App\\Http\\Controllers\\Admin",
                "rbclass"     => "RoleController",
                "method"      => "index",
                "xtype"       => null,
                "isMenu"      => 0
            ], [
                "text"        => "添加",
                "iconCls"     => "app-add",
                "rbnamespace" => "App\\Http\\Controllers\\Admin",
                "rbclass"     => "RoleController",
                "method"      => "store",
                "xtype"       => null,
                "isMenu"      => 0
            ],
            [
                "text"        => "编辑",
                "iconCls"     => "app-edit",
                "rbnamespace" => "App\\Http\\Controllers\\Admin",
                "rbclass"     => "RoleController",
                "method"      => "update",
                "xtype"       => null,
                "isMenu"      => 0
            ],
            [
                "text"        => "删除",
                "iconCls"     => "app-remove",
                "rbnamespace" => "App\\Http\\Controllers\\Admin",
                "rbclass"     => "RoleController",
                "method"      => "destroy",
                "xtype"       => null,
                "isMenu"      => 0
            ]
        ];
    }

    private function app1Info()
    {
        return [
            [
                "text"        => "浏览",
                "iconCls"     => "app-add",
                "rbnamespace" => "App\\Http\\Controllers\\App1",
                "rbclass"     => "Test1Controller",
                "method"      => "index",
                "xtype"       => null,
                "isMenu"      => 0,
                "roles"       => [2, 3]
            ], [
                "text"        => "添加",
                "iconCls"     => "app-add",
                "rbnamespace" => "App\\Http\\Controllers\\App1",
                "rbclass"     => "Test1Controller",
                "method"      => "store",
                "xtype"       => null,
                "isMenu"      => 0,
                "roles"       => [2]
            ],
            [
                "text"        => "编辑",
                "iconCls"     => "app-edit",
                "rbnamespace" => "App\\Http\\Controllers\\App1",
                "rbclass"     => "Test1Controller",
                "method"      => "update",
                "xtype"       => null,
                "isMenu"      => 0,
                "roles"       => [2]
            ],
            [
                "text"        => "删除",
                "iconCls"     => "app-remove",
                "rbnamespace" => "App\\Http\\Controllers\\App1",
                "rbclass"     => "Test1Controller",
                "method"      => "destroy",
                "xtype"       => null,
                "isMenu"      => 0,
                "roles"       => [2]
            ]
        ];
    }

    private function app2Info()
    {
        return [
            [
                "text"        => "浏览",
                "iconCls"     => "app-add",
                "rbnamespace" => "App\\Http\\Controllers\\App2",
                "rbclass"     => "Test2Controller",
                "method"      => "index",
                "xtype"       => null,
                "isMenu"      => 0,
                "roles"       => [5, 6]
            ], [
                "text"        => "添加",
                "iconCls"     => "app-add",
                "rbnamespace" => "App\\Http\\Controllers\\App2",
                "rbclass"     => "Test2Controller",
                "method"      => "store",
                "xtype"       => null,
                "isMenu"      => 0,
                "roles"       => [5]
            ],
            [
                "text"        => "编辑",
                "iconCls"     => "app-edit",
                "rbnamespace" => "App\\Http\\Controllers\\App2",
                "rbclass"     => "Test2Controller",
                "method"      => "update",
                "xtype"       => null,
                "isMenu"      => 0,
                "roles"       => [5]
            ],
            [
                "text"        => "删除",
                "iconCls"     => "app-remove",
                "rbnamespace" => "App\\Http\\Controllers\\App2",
                "rbclass"     => "Test2Controller",
                "method"      => "destroy",
                "xtype"       => null,
                "isMenu"      => 0,
                "roles"       => [5]
            ]
        ];
    }
}
