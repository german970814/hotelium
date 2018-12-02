<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Libraries\CacheMethods;

class Room extends Model {
    use CacheMethods;

    protected $table = 'rooms';

    protected $fillable = [
        'air', 'floor', 'number', 'status',
        'room_type', 'number_beds', 'information'
    ];

    static $FREE = 'F';
    static $RESERVED = 'R';

    static public function getRulesToValidate() {
        return [
            'air' => 'boolean',
            'number' => 'required',
            'number_beds' => 'required|numeric',
            'information' => 'nullable',
            'floor' => 'required|numeric',
            'room_type' => 'required|in:S,D,U',
        ];
    }
}