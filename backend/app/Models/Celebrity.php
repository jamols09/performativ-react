<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Celebrity extends Model
{

    use HasFactory;

    protected $fillable = [
        'name',
        'net_worth',
        'gender',
        'nationality',
        'height',
        'birthday',
        'age', //integer
        'is_alive' //boolean
    ];
}
