<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/namespaces', 'AdminController@resources');

Route::group([
    'namespace' => 'Admin'
], function () {
    Route::post('/login', 'UserController@login');
    Route::get('/login', 'UserController@checkLogin');
    Route::get('/logout', 'UserController@logout');
    Route::post('/repasswd', 'UserController@repasswd');
});

/*后台模块*/
Route::group([
    'namespace'  => 'Admin',
    'middleware' => 'permission'
], function () {
    Route::get('/menus', 'OperationController@menus');
    Route::resource('/operations', 'OperationController');
    Route::resource('/users', 'UserController');
    Route::resource('/roles', 'RoleController');
    Route::get('/roles/{id}/operations', 'RoleController@operations')->where([
        'id' => '[0-9]+'
    ]);
    Route::put('/roles/{id}/operations', 'RoleController@updateOperations')->where([
        'id' => '[0-9]+'
    ]);
    Route::get('/users/{id}/roles', 'UserController@roles')->where([
        'id' => '[0-9]+'
    ]);
    Route::put('/users/{id}/roles', 'UserController@updateRoles')->where([
        'id' => '[0-9]+'
    ]);
});
/*后台模块*/

/**
 * APP1
 */
Route::group([
    'namespace'  => 'App1',
    'middleware' => 'permission'
], function () {
    Route::resource('/test1', 'Test1Controller');
});
/**
 * APP1
 */

/**
 * APP2
 */
Route::group([
    'namespace'  => 'App2',
    'middleware' => 'permission'
], function () {
    Route::resource('/test2', 'Test2Controller');
});
/**
 * APP2
 */