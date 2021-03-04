<?php

namespace App\Http\Controllers;

use DB;
use File;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function admin(){
        $response = ['test' => 'Working successful.'];
        return response()->json($response, 201);
    }

    public function adminUsers(){
        $user = User::select('id','name','email','phone','role','updated_at')->get();
        return response()->json([
            'data' => $user
        ]); 
    }

}
