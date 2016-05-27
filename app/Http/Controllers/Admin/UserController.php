<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\AdminUserModel;
use Session;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Request;

class UserController extends Controller
{
    public function __construct(AdminUserModel $model)
    {
        $this->model = $model;
    }

    /**
     * @return mixed
     * @text 查看用户
     */
    public function index()
    {
        $query = $this->model->where('isAdmin', '>', 1);
        $total = $query->count();
        if (Request::has('start')) {
            $query = $query->offset(Request::input('start'));
        }
        if (Request::has('limit')) {
            $query = $query->take(Request::input('limit'));
        }
        $users = $query->get();

        return $this->response([
            'success' => true,
            'total'   => $total,
            'items'   => $users
        ]);
    }

    /**
     * @param $id
     * @return mixed
     * @text 查看用户拥有的角色
     */
    public function roles($id)
    {
        $roleInfo = $this->model->with(['roles'])->find($id);

        return $this->response($roleInfo->roles);
    }


    /**
     * @param $id
     * @return mixed
     * @text 更新用户的角色
     */
    public function updateRoles($id)
    {
        $user = $this->model->find($id);
        $roles = $this->rawJsonData();
        $roleIds = [];
        foreach ($roles as $roleId => $isAdmin) {

            $roleIds[$roleId] = [
                'isAdmin' => $isAdmin ? 1 : 0
            ];
        }

        $result = $user->roles()->sync($roleIds);
        $user->increment('verifyNumber');
        if ($result) {
            return $this->response([
                'message' => '保存成功',
                'success' => true
            ], 200);
        }

        throw new HttpException(500, '保存失败');
    }


    /**
     * @return mixed
     * @text 用户登录
     */
    public function login()
    {
        $userInfo = $this->rawJsonData();
        if (captcha_check($userInfo['verifyCode'])) {

            $userModel = AdminUserModel::where(
                [
                    'username' => $userInfo['username']
                ])->first();
            if ($userModel) {

                if ($userModel->password ===
                    $userModel->getEncryptString($userInfo['password'])
                ) {
                    Session::set('uid', $userModel->id);
                    Session::set('userInfo', $userModel);

                    return $this->response([
                        'success' => true
                    ]);
                } else {
                    throw new HttpException(500, '用户名或密码错误');
                }
            } else {
                throw new HttpException(500, '用户名不存在');
            }
        } else {
            throw new HttpException(500, '验证码错误');
        }

    }

    /**
     * @return mixed
     * @text 检测用户登录
     */
    public function checkLogin()
    {
        if (Session::has('uid')) {
            return $this->response([
                'success' => false
            ]);
        } else {
            throw new HttpException(401);
        }
    }

    /**
     *
     * @text 用户退出
     */
    public function logout()
    {
        Session::flush();
    }

    /**
     * @text 重置密码
     */
    public function repasswd()
    {
        if (Session::has('uid')) {
            $user = AdminUserModel::find(Session::get('uid'));
            if ($user->password === $user->getEncryptString(Request::input('oldpasswd'))) {
                $user->password = Request::input('newpasswd');
                $user->save();
                $this->logout();
            } else {
                throw new HttpException(500, '密码错误');
            }
        } else {
            throw new HttpException(401);
        }
    }
}
