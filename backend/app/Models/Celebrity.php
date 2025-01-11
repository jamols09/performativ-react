<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Celebrity extends Model
{
    protected $fillable = [
        'name',
        'net_worth',
        'gender',
        'nationality',
        'height',
        'birthday',
        'age',
        'is_alive'
    ];
}
