<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Models\Customer;

class CustomerController extends Controller {
    private $messages = [
        'required' => 'Este campo es requerido',
        'identification_number.unique' => 'El numero de identificación ya ha sido usado',
        'identification_type.unique' => 'El tipo de identificación ya ha sido usado',
    ];

    public function detail($id) {
        $customer = Customer::findOrFail($id);

        return response()->json([
            'code' => 200,
            'message' => '',
            'data' => $customer->toArray()
        ]);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), Customer::getRulesToValidate(), $this->messages);

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

        $customer = Customer::create($validated_data);

        return response()->json([
            'code' => 200,
            'message' => 'Cliente creado',
            'data' => $customer->toArray()
        ]);
    }

    public function update(Request $request, $id) {
        $customer = Customer::findOrFail($id);

        $validator = Validator::make($request->all(), Customer::getRulesToValidate($customer), $this->messages);

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

        $customer->update($validated_data);

        return response()->json([
            'code' => 200,
            'message' => 'Cliente actualizado',
            'data' => $customer->toArray()
        ]);
    }

    public function delete($id) {
        $customer = Customer::findOrFail($id);
        $reserva = \App\Models\Reservation::where('customer_id', $id)->first();

        if ($reserva) {
            return response()->json([
                'code' => 400,
                'message' => 'Cliente tiene reserva',
            ]);
        }

        $customer->update(['status' => Customer::$DELETED]);

        return response()->json([
            'code' => 200,
            'message' => 'Cliente archivado',
        ]);
    }

    public function list(Request $request) {
        $query = $request->q;

        if ($query) {
            $customers = Customer::where('status', Customer::$ACTIVE)
                ->where(function($_query) use ($query) {
                    $_query
                        ->where('name', 'ILIKE', '%' . $query . '%')
                        ->orWhere('last_name', 'ILIKE', '%' . $query . '%')
                        ->orWhere('identification_number', 'ILIKE', '%' . $query . '%');
                })
                ->distinct()
                ->paginate(25);
        } else {
            $customers = Customer::where('status', Customer::$ACTIVE)->paginate(25);
        }
        $customers->withPath('/json/customers');

        return response()->json([
            'code' => 200,
            'message' => '',
            'data' => $customers->toArray()
        ]);
    }
}