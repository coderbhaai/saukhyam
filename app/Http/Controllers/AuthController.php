<?php

namespace App\Http\Controllers;
use DB;
use Auth;
use Hash;
use Mail;
use App\Models\User;
use App\Mail\ForgotPassword;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function test(){
        $response = ['test' => 'Working successful.'];
        return response()->json($response, 201);
    }

    public function register(Request $request){
        $payload = [
            'name'=>$request->name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'role'=>$request->role,
            'provider'=>$request->provider,
            'image'=>$request->image,
            'password'=>\Hash::make($request->password),
        ];
        // $existing = User::where('phone', $request->phone )->first();
        // if (!is_null($existing)) {
        //     $response = ['success'=>false, 'message'=>'Phone already registered'];
        //     return response()->json($response, 201);
        // }

        // if($request->password_confirmation === $request->password){
        // }else{
        //     $response = ['success'=>false, 'message'=>'Passwords Do Not Match'];   
        //     return response()->json($response, 201);
        // }

        $user = new \App\Models\User($payload);
        if ($user->save())
        {
            $user = \App\Models\User::where('phone', $request->phone)->first();
            if($user->role === 'Admin'){ $tokenResult = $user->createToken('authToken', ['Admin'])->plainTextToken; }else
            if($user->role === 'User'){ $tokenResult = $user->createToken('authToken', ['User'])->plainTextToken; }

            $user->token = $tokenResult;
            $user->save();
            $response = [
                'success'           =>  true,
                'message'           =>  'Registration succesful',
                'status_code'       =>  200,
                'access_token'      =>  $tokenResult,
                'token_type'        => 'Bearer',
                'message'           => 'Welcome Aboard',
                'data'              =>  $user
            ];
            return response()->json($response, 201);
        }
    }

    public function login(Request $request){
        try {
                $request->validate([
                    'email'             => 'email|required',
                    'password'          => 'required'
                ]);

                if(!(User::where('email', $request->email)->exists())){
                    return response()->json([
                        'success'       =>  false, 
                        'message'       =>  "No account by this name. Please register",
                        'access_token'  =>  null
                    ]);
                }
                $credentials = request(['email', 'password']);
                if (!Auth::attempt($credentials)) {
                    return response()->json([
                        'success'       => false,
                        'status_code'   => 500,
                        'message'       => 'Wrong Credentials',
                        'access_token'  =>  null
                    ]);
                }
                $user = User::where('email', $request->email)->first();
                if ( ! Hash::check($request->password, $user->password, [])) {
                    throw new \Exception('Error in Login');
                }
                
                if($user->role === 'Admin'){ $tokenResult = $user->createToken('authToken', ['Admin'])->plainTextToken; }else
                if($user->role === 'User'){ $tokenResult = $user->createToken('authToken', ['User'])->plainTextToken; }

                $user->token = $tokenResult;
                return response()->json([
                    'success'           => true,
                    'status_code'       => 200,
                    'access_token'      => $tokenResult,
                    'token_type'        => 'Bearer',
                    'message'           => 'Welcome Aboard',
                    'data'              =>  $user
                ]);
            } 
        catch (Exception $error) {
            return response()->json([
                'status_code' => 500,
                'message' => 'Error in Login',
                'error' => $error,
            ]);
        }
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        $response = [
            'success'           =>  true,
            'message'           => 'Logout successful.'
        ];
        return response()->json($response, 201);
    }
    
    public function forgotPassword(Request $request){
        $user = User::where('email', $request->email)->first();
        if(is_null($user)){
            $response = ['success'=>false, 'response'=>"No account by this name. Please register"];
        }else{
            $token = substr(sha1(rand()), 0, 30);
            $date = now();
            DB::table('password_resets')
                ->updateOrInsert(
                    ['email' => $request->email],
                    ['token' => $token, 'created_at' => $date]
                );
            Mail::to( $request->email)->cc(['amit.khare588@gmail.com'])->send(new ForgotPassword($token, $user)); 
            $response = ['success'=>true, 'message' => "Password Reset Email Sent. Please Check"];
        }
        return response()->json($response, 201);
    }

}
