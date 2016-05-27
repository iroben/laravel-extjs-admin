<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Models\Admin\RoleModel;
use Symfony\Component\HttpKernel\Exception\HttpException;

class RoleController extends Controller
{
    function __construct(RoleModel $model)
    {
        $this->model = $model;
    }

    /**
     * @return mixed
     * @text 查看角色
     */
    public function index()
    {
        $roles = $this->model->get();

        return $this->response($roles);
    }

    /**
     * @param $id
     * @return mixed
     * @text 查看子角色
     */
    public function show($id)
    {
        $roles = $this->model->where('pid', $id)->with(['children'])->get();

        return $this->response($roles);
    }

    /**
     * @param $id
     * @return mixed
     * @text 查看角色拥有的功能
     */
    public function operations($id)
    {
        $roleInfo = $this->model->with(['operations'])->find($id);

        return $this->response($roleInfo->operations);
    }


    /**
     * @param $id
     * @return mixed
     * @text 更新角色功能
     */
    public function updateOperations($id)
    {
        $roles  = $this->model->with(['users'])->find($id);
        $result = $roles->operations()->sync($this->rawJsonData());
        if ($result) {
            if (!$roles->users->isEmpty()) {
                foreach ($roles->users as $user) {
                    $user->increment('verifyNumber');
                }
            }

            return $this->response([
                'message' => '保存成功',
                'success' => true
            ], 200);
        }

        throw new HttpException(500);
    }
}
