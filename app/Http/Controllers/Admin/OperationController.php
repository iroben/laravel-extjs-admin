<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\AdminUserModel;
use App\Models\Admin\OperationModel;
use Session;

class OperationController extends Controller
{
    function __construct(OperationModel $model)
    {
        $this->model = $model;
    }

    /**
     * Display a listing of the resource.
     * @text 查看功能
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $root = $this->model->root()->get();

        return $this->response($root);
    }


    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @text 查看功能子功能
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $operations = $this->model
            ->where('pid', intval($id))
            ->latest('order')
            ->with(['children'])->get();

        return $this->response($operations);
    }

    protected function updateAfter($model)
    {
        if (!$model->roles->isEmpty()) {
            foreach ($model->roles as $role) {
                if (!$role->users->isEmpty()) {
                    foreach ($role->users as $user) {
                        $user->increment('verifyNumber');
                    }
                }
            }

        }
    }

    /**
     * @return mixed
     * @text 加载菜单
     */
    public function menus()
    {

        $userInfo = Session::get('userInfo');

        if ($userInfo->isSuperAdmin()) {
            $root = $this->model->root()->with(['menus'])->get();

            return $this->response($root);
        } elseif ($userInfo->isAdmin()) {
            $root = $this->model->root()->with(['menus'])->get();

            return $this->response($this->getAdminOperation($root));
        } else {
            $userModel = AdminUserModel::with(['roles.operations', 'roles.children.operations'])->find($userInfo->id);
            $operations = $this->getOperations($userModel->roles);
            /* foreach ($userInfo->roles as $role) {
                 foreach ($role->operations as $operation) {
                     if ($operation->isMenu) {
                         $operations[$operation->id] = $operation->toArray();
                     }
                 }
             }*/
            if ($operations) {
                return $this->response($this->generateTree($operations));
            }
            return $this->response([]);

        }
    }

    /**
     * 递归获取所有子结点的权限
     * @param $roles
     * @return array|bool
     */
    protected function getOperations($roles)
    {
        if ($roles->isEmpty()) {
            return false;
        }
        $operations = [];
        foreach ($roles as $role) {
            if (!$role->operations->isEmpty()) {
                foreach ($role->operations as $operation) {
                    if ($operation->isMenu) {
                        $operations[$operation->id] = $operation->toArray();
                    }
                }
            }
            $flag = $this->getOperations($role->children);
            if ($flag) {
                foreach ($flag as $val) {
                    $operations[$val['id']] = $val;
                }
            }
        }
        return $operations;
    }

    /**
     * 除了Admin命名空间下的管理员不能访问外，其它的都可以
     * @param $operations
     * @return array
     */
    protected function getAdminOperation($operations)
    {
        $return = [];
        foreach ($operations as $val) {
            if ($val->rbnamespace !== 'App\\Http\\Controllers\\Admin'
                && !in_array($val->rbclass, [
                    'UserController',
                    'RoleController',
                    'OperationController'
                ])
            ) {
                if (!$val->children->isEmpty()) {
                    $val->children = $this->getAdminOperation($val->children);
                }
                $return[] = $val;
            }
        }

        return $return;

    }

    protected function generateTree($operations, $pid = 0)
    {
        $result = [];
        foreach ($operations as $operation) {
            if ($operation['pid'] == $pid) {
                $children = $this->generateTree($operations, $operation['id']);
                if ($children) {
                    $operation['leaf'] = false;
                    $operation['expanded'] = true;
                    $operation['menus'] = $children;
                } else {
                    $operation['leaf'] = true;
                    $operation['expanded'] = false;
                }
                $result[] = $operation;
            }

        }

        return $result;
    }

}
