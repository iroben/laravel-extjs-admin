<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        HttpException::class,
        ModelNotFoundException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception $e
     * @return void
     */
    public function report(Exception $e)
    {
        return parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Exception $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        /*if (env('APP_DEBUG')) {

            if ($e instanceof ModelNotFoundException) {
                $e = new NotFoundHttpException($e->getMessage(), $e);
            }

            return parent::render($request, $e);
        } else {*/

            if ($e instanceof HttpException) {
                $code = $e->getStatusCode();
            } else {
                $code = $e->getCode();
            }
            $msg = [
                401 => '请登录后再操作',
                403 => '你没有操作权限',
                404 => '资源不存在',
                500 => '系统内部错误，请联系BB'
            ];

            if (!$code) {
                $code = 500;
            }

            if ($e->getMessage()) {
                $message = $e->getMessage();
            } elseif (isset($msg[$code])) {
                $message = $msg[$code];
            } else {
                $message = '未知错误，请联系BB';
            }

            return response($message, $code);
        /*}*/
    }
}
