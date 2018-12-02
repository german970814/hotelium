<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Models\{ Customer, Room, Reservation };

class ReservationController extends Controller {
    public function bookingRoom($customerId, $roomId) {
        $customer = Customer::findOrFail($customerId);
        $room = Room::findOrFail($roomId);

        $reservation = Reservation::where('customer_id', $customer->id)
            ->where('room_id', $room->id)
            ->first();

        try {
            DB::beginTransaction();
            if ($reservation) {
                $reservation->delete();
                $room->update([ 'status' => Room::$FREE ]);
            } else {
                $reservation = Reservation::create([
                    'room_id' => $room->id,
                    'customer_id' => $customer->id
                ]);
                $room->update([ 'status' => Room::$RESERVED ]);
            }
            DB::commit();
        } catch (\PDOException $exception) {
            DB::rollback();
            throw $exception;
        }

        return response()->json([
            'code' => 200,
            'message' => '',
            'data' => []
        ]);
    }

    public function getClientFromBooking($roomId) {
        $reservation = Reservation::where('room_id', $roomId)->first();

        if ($reservation) {
            $customer = Customer::find($reservation->customer_id);
            
            return response()->json([
                'code' => 200,
                'message' => '',
                'data' => $customer->toArray()
            ]);
        }
        return response()->json([
            'code' => 404,
            'message' => 'Page does not exists',
            'data' => []
        ]);
    }
}
