<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profiles extends Model
{
    use HasFactory;
    protected $fillable = [ 'userId', 'name', 'gender', 'residence', 'email', 'phone', 'occupation', 'education', 'languages', 'country', 'state', 'city', 'area', 'pin', 'image' ];
}