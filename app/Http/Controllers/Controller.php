<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    protected $model;

    protected function response($data, $status = 200)
    {
        return response(is_array($data) ? json_encode($data) : $data, $status)->header(
            'Content-Type', 'application/json; Charset=UTF-8'
        );
    }

    protected function rawJsonData()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    public function index()
    {
        $query = $this->model;
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

    public function update($id)
    {
        $data = $this->rawJsonData();

        $operationModel = $this->model->find($data['id']);
        if ($operationModel) {
            $operationModel->fill($data);
            if ($operationModel->save()) {

                return $this->response('', 204);
            } else {
                throw new HttpException(500);


            }
        }
        throw new HttpException(404);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @text 添加
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        //
        $data = $this->rawJsonData();
        $data['created'] = time();
        $model = $this->model->create($data);
        if ($model) {
            return $this->response($model, 201);
        } else {
            throw new HttpException(500);
        }

    }

    /**
     * @text 删除
     * @param $id
     * @return mixed
     */
    public function destroy($id)
    {
        //
        $this->model->destroy($id);
//
        return $this->response([
            'success' => true,
            'message' => '删除成功'
        ]);
    }

}
