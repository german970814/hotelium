<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Models\Room;

class RoomController extends Controller {
    private $messages = [
        'required' => 'Este campo es requerido',
        'in' => 'La opción seleccionada no es correcta'
    ];

    public function detail($id) {
        $room = Room::findOrFail($id);

        return response()->json([
            'code' => 200,
            'message' => '',
            'data' => $room->toArray()
        ]);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), Room::getRulesToValidate(), $this->messages);

        if ($validator->fails()) {
            return response()->json([
                'code' => 400,
                'message' => 'Something is wrong',
                'data' => [
                    'errors' => $validator->messages()
                ]
            ]);
        }
        
        $validated_data = $validator->validate();
        $room = Room::create($validated_data);

        return response()->json([
            'code' => 200,
            'message' => 'Habitación creada',
            'data' => $room->toArray()
        ]);
    }

    public function update(Request $request, $id) {
        $room = Room::findOrFail($id);

        $validator = Validator::make($request->all(), Room::getRulesToValidate($room), $this->messages);

        if ($validator->fails()) {
            return response()->json([
                'code' => 400,
                'message' => 'Something is wrong',
                'data' => [
                    'errors' => $validator->messages()
                ]
            ]);
        }

        $validated_data = $validator->validate();
        $room->update($validated_data);

        return response()->json([
            'code' => 200,
            'message' => 'Habitación actualizada',
            'data' => $room->toArray()
        ]);
    }

    public function delete($id) {
        $room = Room::findOrFail($id);
        $reserva = \App\Models\Reservation::where('room_id', $id)->first();

        if ($reserva) {
            return response()->json([
                'code' => 400,
                'message' => 'Habitación tiene reserva',
            ]);
        }

        $room->delete();

        return response()->json([
            'code' => 200,
            'message' => 'Habitación eliminada',
        ]);
    }

    public function list() {
        $rooms = Room::paginate(25);
        $rooms->withPath('/');  // TODO

        return response()->json([
            'code' => 200,
            'message' => '',
            'data' => $rooms->toArray()
        ]);
    }
}
