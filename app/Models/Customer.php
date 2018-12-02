<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Input;
use Illuminate\Validation\Rule;
use App\Libraries\CacheMethods;

class Customer extends Model {
    use CacheMethods;

    protected $table = 'customers';

    protected $fillable = [
        'name', 'address', 'last_name', 
        'birthday_date', 'phone', 'user_id',
        'cellphone', 'identification_number',
        'identification_type', 'status'
    ];

    static $ACTIVE = 'A';
    static $DELETED = 'D';

    static public function getRulesToValidate(Customer $customer=null) {
        return [
            'name' => 'required',
            'phone' => 'nullable',
            'address' => 'required',
            'cellphone' => 'nullable',
            'last_name' => 'required', 
            'birthday_date' => 'required',
            'identification_number' => 'required|unique:customers,identification_number,' . ($customer ? $customer->id : 'NULL') . ',id,identification_type,' . Input::get('identification_type'),
            'identification_type' => 'required|in:CC,CE,CI,PA|unique:customers,identification_type,' . ($customer ? $customer->id : 'NULL') . ',id,identification_number,' . Input::get('identification_number'),
        ];
    }
}
