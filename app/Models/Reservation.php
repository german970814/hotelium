<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Libraries\CacheMethods;

class Reservation extends Model {
    use CacheMethods;

    protected $table = 'reservations';

    protected $fillable = ['room_id', 'customer_id'];
}
