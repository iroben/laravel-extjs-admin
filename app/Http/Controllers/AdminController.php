<?php
/**
 * Created by PhpStorm.
 * User: LiuBin
 * Date: 2016/5/26
 * Time: 14:33
 */

namespace App\Http\Controllers;


class AdminController extends Controller
{
    /**解析接口信息
     * @return mixed
     */
    public function resources()
    {
        $appPath = app()->path();
        $controllerPath = $appPath . '/Http/Controllers';
        return $this->response($this->iteratorPath($controllerPath, $appPath, true));
    }

    protected function iteratorPath($path, $basePath, $isRoot = false)
    {
        $directoryIterator = new \DirectoryIterator($path);
        $classInfo = [];
        foreach ($directoryIterator as $val) {

            $className = str_replace([
                $basePath,
                '/',
                '.php'
            ], [
                'App',
                '\\',
                ''
            ], $val->getRealPath());

            if ($val->isDot()) {
                continue;
            } elseif ($val->isDir()) {
                if ($isRoot) {
                    $classInfo[] = [
                        'className' => $className,
                        'children'  => $this->iteratorPath($val->getRealPath(), $basePath)
                    ];
                } else {
                    $classInfo[] = [
                        'className' => pathinfo($val->getRealPath(), PATHINFO_FILENAME),
                        'children'  => $this->iteratorPath($val->getRealPath(), $basePath)
                    ];
                }

            } elseif (!in_array($val->getFilename(), [
                'AdminController.php',
                'Controller.php'
            ])
            ) {

                $reflection = new \ReflectionClass($className);
                $methods = $reflection->getMethods();
                $ret = [];
                foreach ($methods as $method) {
                    if (!in_array($method->getName(), [
                            'authorize',
                            'authorizeForUser',
                            'validate',
                            'validateWithBag',
                            'authorizeAtGate'
                        ]) &&
                        $method->isPublic() &&
                        !$method->isConstructor() &&
                        !$method->isDestructor()
                    ) {
                        $declareClassName = $method->getDeclaringClass()->getName();
                        if ($declareClassName === $className ||
                            $declareClassName === 'App\\Http\\Controllers\\Controller'
                        ) {
                            $method->getName();
                            $docComment = $method->getDocComment();
                            preg_match('/@text[\s\S]*?(.*?)\n/', $docComment, $data);
                            if ($data) {
                                $ret[] = [
                                    'method' => $method->getName(),
                                    'text'   => trim($data[1])
                                ];
                            } else {
                                $ret[] = [
                                    'method' => $method->getName(),
                                    'text'   => ''
                                ];
                            }
                        }
                    }
                }
                $classInfo[] = [
                    'className' => pathinfo($val->getRealPath(), PATHINFO_FILENAME),
                    'children'  => $ret
                ];
            }
        }
        return $classInfo;
    }

}