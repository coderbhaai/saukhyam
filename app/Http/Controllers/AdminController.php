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
        // $user = User::select('id','name','email','phone','role','updated_at')->get();
        $user       =   DB::table('users')->leftJoin('basics', 'basics.id', '=', 'users.fCentre')
                        ->select([ 'users.id','users.name','users.email','users.phone','users.role', 'users.fCentre', 'users.updated_at', 'basics.name as fCentreName', 'basics.tab1 as fCentreLocation' ])
                        ->get();

        $basic = Basic::select('id','name','type','tab1')->where('type', 'FCentre')->get();
        return response()->json([
            'data' => $user,
            'basic' => $basic,
        ]); 
    }

    public function updateUser(Request $request){
        $dB                     =  User::find($request->id);
        $dB->role               =   $request->role;
        if($request->role == 'Amrita' || $request->role == 'Vijaya'){
            $dB->fCentre               =   $request->fCentre;
        }else{
            $dB->fCentre               =   NULL;
        }
        $dB-> save();
        // $data = User::where('id', $request->id)->select('id','name','email','phone','role','updated_at')->get();
        $data       =   DB::table('users')->leftJoin('basics', 'basics.id', '=', 'users.fCentre')
                        ->where('users.id', $request->id)
                        ->select([ 'users.id','users.name','users.email','users.phone','users.role', 'users.fCentre', 'users.updated_at', 'basics.name as fCentreName', 'basics.tab1 as fCentreLocation' ])
                        ->get();
        $response = ['success'=>true, 'data'=>$data[0], 'message' => "User updated succesfully"];
        return response()->json($response, 201);
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
        $dB                                 =   Products::find($request->id);
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
            if(!is_null($dB->images)){
                foreach(json_decode($dB->images) as $xx){
                    $deleteImage = public_path("storage/product/{$xx}");        
                    if (isset($deleteImage)) { file::delete($deleteImage);  }
                }
            }            
            $dB->images = json_encode($imageArray);
        }
        $dB-> save();
        $response = ['success'=>true, 'message' => "Product updated succesfully"];
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

    public function getProduct(){
        $data = Basic::select('id','name','type', 'tab1')->whereIn('type', ['ProductType', 'DimensionValue', 'DimensionType'])->get();
        $product = Products::where('id', 1)->first();
        $response = ['success'=>true, 'data'=>$data, 'product'=> $product];
        return response()->json($response, 201);
    }

    public function adminTutorials(){
        $data = Tutorials::select('id','name','type','description','url','updated_at')->get();
        return response()->json([ 'data' => $data ]); 
    }

    public function createTutorial(Request $request){
        $dB                     =   new Tutorials;
        $dB->type               =   $request->type;
        $dB->name               =   $request->name;
        $dB->description        =   $request->description;
        if($request->type=="Iframe"){
            $dB->url            =   $request->url;
        }else 
        if($request->type=="Video" || $request->type=="Doc"){
            if ($request->hasFile('file')) {
                $fileName = time() . '-'.'.' . $request->file('file')->getClientOriginalExtension();
                $request->file('file')->move(storage_path('app/public/tutorial/'), $fileName); 
                $dB->url = $fileName;
            }
        } 
        $dB-> save();
        $data = Tutorials::limit(1)->orderBy('id', 'desc')->select('id','name','type','description','url','updated_at')->get();
        $response = ['success'=>true, 'data'=>$data[0], 'message' => "Tutorial created succesfully"];
        return response()->json($response, 201);
    }

    public function updateTutorial(Request $request){
        $dB                     =  Tutorials::find($request->id);
        $dB->type               =   $request->type;
        $dB->name               =   $request->name;
        $dB->description        =   $request->description;
        if($request->type=="Iframe"){
            $dB->url            =   $request->url;
        }else 
        if($request->type=="Video" || $request->type=="Doc"){
            if ($request->hasFile('file')) {
                $fileName = time() . '-'.'.' . $request->file('file')->getClientOriginalExtension();
                $request->file('file')->move(storage_path('app/public/tutorial/'), $fileName);
                if(!is_null($dB->url)){
                    $deleteImage = public_path("storage/tutorial/{$dB->url}");        
                    if (isset($deleteImage)) { file::delete($deleteImage); }
                }
                $dB->url = $fileName;
            }
        }
        $dB-> save();
        $data = Tutorials::where('id', $request->id)->select('id','name','type','description','url','updated_at')->get();
        $response = ['success'=>true, 'data'=>$data[0], 'message' => "Tutorial updated succesfully"];
        return response()->json($response, 201);
    }

    public function adminLanguages(){
        $data       =   DB::table('languages')
                        ->leftJoin('basics', 'basics.id', '=', 'languages.screenId')
                        ->select([ 'languages.id', 'languages.screenId', 'languages.text', 'languages.options', 'languages.updated_at', 'basics.name as screenName' ])
                        ->get();

        $basic = Basic::select('id','name','type')->whereIn('type', ['Language', 'Screen'])->get();
        return response()->json([ 'data' => $data, 'basic' => $basic ]); 
    }

    public function createLanguage(Request $request){
        $dB                     =   new Language;
        $dB->screenId           =   $request->screenId;
        $dB->text               =   $request->text;
        $dB->options            =   $request->options;
        $dB-> save();
        $data       =   DB::table('languages')->leftJoin('basics', 'basics.id', '=', 'languages.screenId')
                        ->limit(1)->orderBy('languages.id', 'desc')
                        ->select([ 'languages.id', 'languages.screenId', 'languages.text', 'languages.options', 'languages.updated_at', 'basics.name as screenName' ])
                        ->get();
        $response = ['success'=>true, 'data'=>$data[0], 'message' => "Language created succesfully"];
        return response()->json($response, 201);
    }

    public function updateLanguage(Request $request){
        $dB                     =   Language::find($request->id);
        $dB->screenId           =   $request->screenId;
        $dB->text               =   $request->text;
        $dB->options            =   $request->options;
        $dB-> save();
        $data       =   DB::table('languages')->leftJoin('basics', 'basics.id', '=', 'languages.screenId')
                        ->where('languages.id', $request->id)
                        ->select([ 'languages.id', 'languages.screenId', 'languages.text', 'languages.options', 'languages.updated_at', 'basics.name as screenName' ])
                        ->get();
        $response = ['success'=>true, 'data'=>$data[0], 'message' => "Language updated succesfully"];
        return response()->json($response, 201);
    }
    

}
