<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::group(['middleware' => 'cors', 'prefix' => 'json'], function () {
    // Customers
    Route::get(
        '/customers/{id}',
        'CustomerController@detail'
    );
    Route::get(
        '/customers',
        'CustomerController@list'
    );
    Route::post(
        '/customers',
        'CustomerController@store'
    );
    Route::post(
        '/customers/{id}',
        'CustomerController@update'
    );
    Route::post(
        '/customers/{id}/delete',
        'CustomerController@delete'
    );

    // Rooms
    Route::get(
        '/rooms/{id}',
        'RoomController@detail'
    );
    Route::get(
        '/rooms',
        'RoomController@list'
    );
    Route::post(
        '/rooms',
        'RoomController@store'
    );
    Route::post(
        '/rooms/{id}',
        'RoomController@update'
    );
    Route::post(
        '/rooms/{id}/delete',
        'RoomController@delete'
    );

    // Reservations
    Route::post(
        '/reservations/{customerId}/{roomId}',
        'ReservationController@bookingRoom'
    );
    Route::get(
        '/reservations/client/{roomId}',
        'ReservationController@getClientFromBooking'
    );
});