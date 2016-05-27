<?php

namespace App\Http\Middleware;

use App\Models\Admin\AdminUserModel;
use App\Models\Admin\RoleModel;
use Closure;
use Route;
use Session;
use Symfony\Component\HttpKernel\Exception\HttpException;

class PermissionManager
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     *
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $currentAction = Route::currentRouteAction();
        if ($currentAction) {
            if (!Session::has('uid')) {
                throw new HttpException(401);
            }

            $userModel = $this->getUserRoleOperation();
            list($className, $method) = explode('@', $currentAction);

            /**
             * 用户管理，角色管理管理，功能管理只有超级管理员有权限操作
             */
            if (!$userModel->isSuperAdmin()) {
                /**
                 * 加载菜单功能默认都有
                 */
                if ($currentAction ===
                    'App\\Http\\Controllers\\Admin\\OperationController@menus'
                ) {
                    return $next($request);
                }
                if (in_array($className, [
                    'App\\Http\\Controllers\\Admin\\UserController',
                    'App\\Http\\Controllers\\Admin\\RoleController',
                    'App\\Http\\Controllers\\Admin\\OperationController'
                ])
                ) {
                    throw new HttpException(403, '你没有操作权限');
                }
                /**
                 * 不是管理员的话，按角色功能来判断
                 */
                if (!$userModel->isAdmin()) {
                    if (!$this->checkPermission($userModel, $currentAction)) {
                        throw new HttpException(403, '你没有操作权限');
                    }
                }

            }
        }

        return $next($request);
    }

    /**
     * 获取用户权限数据
     *
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|null
     */
    protected function getUserRoleOperation()
    {
        $uid = Session::get('uid');
        if (Session::has('loadedUserOperations')) {
            $userModel = AdminUserModel::find($uid);
            $userInfo = Session::get('userInfo');
            /**
             * 如果用户权限数据更新了，重新加载权限数据
             */
            if ($userInfo->verifyNumber !== $userModel->verifyNumber) {
                $userModel = AdminUserModel::with(['roles.operations', 'roles.children.operations'])->find($uid);
                Session::set('userInfo', $userModel);

                return $userModel;
            }

            return $userInfo;
        } else {
            $userModel = AdminUserModel::with(['roles.operations', 'roles.children.operations'])->find($uid);
            Session::set('userInfo', $userModel);
            Session::set('loadedUserOperations', 1);

            return $userModel;
        }

    }

    /**
     * 检查用户是否有操作该资源的权限
     *
     * @param $userModel
     * @param $currentAction
     *
     * @return bool
     */
    protected function checkPermission($model, $currentAction)
    {
        if (isset($model->roles) && $model->roles->isEmpty()) {
            return false;
        }
        if (isset($model->children) && $model->children->isEmpty()) {
            return false;
        }
        $roles = isset($model->roles) ? $model->roles : $model->children;
        foreach ($roles as $role) {
            if (!$role->operations->isEmpty()) {
                $flag = $this->check($role, $currentAction);
                if ($flag) {
                    return true;
                }
            }
            if (!$role->children->isEmpty()) {
                foreach ($role->children as $child) {
                    $flag = $this->check($child, $currentAction);
                    if ($flag) {
                        return true;
                    }
                    $flag = $this->checkPermission($role, $currentAction);
                    if ($flag) {
                        return true;
                    }
                }
            }
        }

        return false;

    }

    protected function check($roles, $currentAction)
    {
        foreach ($roles->operations as $operations) {
            if ($operations->rbnamespace . '\\' . $operations->rbclass
                . '@' . $operations->method === $currentAction
            ) {
                return true;
            }
        }
        return false;
    }
}
