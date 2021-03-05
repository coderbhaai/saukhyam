<?php

namespace App\Http\Controllers;

use DB;
use File;
use App\Models\User;
use App\Models\Basic;
use App\Models\Language;
use App\Models\Orders;
use App\Models\Products;
use App\Models\Profiles;
use App\Models\Tutorials;
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

    public function adminBasics(){
        $data = Basic::select('id','name','type','tab1','tab2', 'tab3', 'updated_at')->get()->map(function($i) {
            if($i->type=='DimensionValue'){
                $xx   =   Basic::select('name as bName')->where( 'id', $i->tab1 )->first();
                $i['bName']  =   $xx->bName;
            }
            return $i;
        });
        return response()->json([ 'data' => $data ]); 
    }

    public function createBasic(Request $request){
        $dB                     =   new Basic;
        $dB->type               =   $request->type;
        $dB->name               =   $request->name;
        $dB->tab1               =   $request->tab1;
        $dB->tab2               =   $request->tab2;
        $dB->tab3               =   $request->tab3;
        $dB-> save();
        $data = Basic::limit(1)->orderBy('id', 'desc')->select('id','name','type','tab1','tab2', 'tab3', 'updated_at')->get()->map(function($i) {
            if($i->type=='DimensionValue'){
                $xx   =   Basic::select('name as bName')->where( 'id', $i->tab1 )->first();
                $i['bName']  =   $xx->bName;
            }
            return $i;
        });
        $response = ['success'=>true, 'data'=>$data[0], 'message' => "Basic created succesfully"];
        return response()->json($response, 201);
    }

    public function updateBasic(Request $request){
        $dB                     =  Basic::find($request->id);
        $dB->type               =   $request->type;
        $dB->name               =   $request->name;
        $dB->tab1               =   $request->tab1;
        $dB->tab2               =   $request->tab2;
        $dB->tab3               =   $request->tab3;
        $dB-> save();
        $data = Basic::where('id', $request->id)->select('id','name','type','tab1','tab2', 'tab3', 'updated_at')->get()->map(function($i) {
            if($i->type=='DimensionValue'){
                $xx   =   Basic::select('name as bName')->where( 'id', $i->tab1 )->first();
                $i['bName']  =   $xx->bName;
            }
            return $i;
        });
        $response = ['success'=>true, 'data'=>$data[0], 'message' => "Basic updated succesfully"];
        return response()->json($response, 201);
    }

    public function adminProducts(){
        $data = Products::select('id','name','type', 'price','images', 'status', 'updated_at')->get();
        return response()->json([ 'data' => $data ]); 
    }

    public function addProductOptions(){
        $data = Basic::select('id','name','type', 'tab1')->whereIn('type', ['ProductType', 'DimensionValue', 'DimensionType'])->get();
        return response()->json([ 'data' => $data ]); 
    }

    public function createProduct(Request $request){
        $dB                                 =   new Products;
        $dB->type                           =   $request->type;
        $dB->name                           =   $request->name;
        $dB->price                          =   $request->price;
        $dB->status                         =   $request->status;
        $dB->distype                        =   $request->distype;
        $dB->discount                       =   $request->discount;
        $dB->short_description              =   $request->short_description;
        $dB->long_description               =   $request->long_description;
        $dB->dimension                      =   $request->dimension;
        if ($request->hasFile('images')) {
            $count = 0;
            $imageArray = [];
            foreach ($request->file('images') as $file) {
                $count = $count + 1;
                $fileName = time() . '-' . $count . '.' . $file->getClientOriginalExtension();
                $file->move(storage_path('app/public/product/'), $fileName);    
                $imageArray[] = $fileName;
            }
            $dB->images = json_encode($imageArray);
        }
        $dB-> save();      
        $response = ['success'=>true, 'message' => "Product created succesfully"];
        return response()->json($response, 201);
    }

    public function updateProduct(Request $request){
        $dB                     =  Products::find($request->id);
        $dB->type               =   $request->type;
        $dB->name               =   $request->name;
        $dB->tab1               =   $request->tab1;
        $dB->tab2               =   $request->tab2;
        $dB->tab3               =   $request->tab3;
        $dB-> save();
        $data = Product::where('id', $request->id)->select('id','name','type','tab1','tab2', 'tab3', 'updated_at')->first();
        $response = ['success'=>true, 'data'=>$data, 'message' => "Product updated succesfully"];
        return response()->json($response, 201);
    }

    public function changeProductStatus(Request $request){
            $dB                   =   Products::find($request->id);
            $dB->status           =   $request->status;
            $dB-> save();
            $data = Products::where('id', $request->id)->select('id','name','type', 'price','images', 'status', 'updated_at')->first();
            $response = ['success'=>true, 'data'=>$data, 'message'=>'Status Updated Succesfully'];
        return response()->json($response, 201);
    }

}
