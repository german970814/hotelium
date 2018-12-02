<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Initial extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Rooms schema
         */
        Schema::create('rooms', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->boolean('air');
            $table->integer('floor');
            $table->integer('number');
            $table->string('room_type');  // S => 'Simple', D => 'Double', U => 'Suite'
            $table->integer('number_beds');
            $table->text('information')->nullable();
            $table->string('status', 1)->default('F');  // F => 'Free', R => 'Reserved'

            $table->unique(['number', 'floor']);
        });

        /**
         * Clients schema
         */
        Schema::create('customers', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->string('name', 255);
            $table->string('address', 255);
            $table->string('last_name', 255);
            $table->timestamp('birthday_date');
            $table->integer('phone')->nullable();
            // $table->integer('user_id')->unsigned();  // Relationship to laravel user model
            $table->integer('cellphone')->nullable();
            $table->integer('identification_number');
            $table->string('identification_type', 10);  // CC, CE, TI, Passaport
            $table->string('status', 1)->default('A');  // A (Active), D (Deleted)

            $table->unique(['identification_number', 'identification_type']);
        });

        /**
         * Bookings table
         */
        Schema::create('reservations', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->integer('customer_id')->unsigned();
            $table->integer('room_id')->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hotels');
        Schema::dropIfExists('customers');
        Schema::dropIfExists('reservations');
    }
}
