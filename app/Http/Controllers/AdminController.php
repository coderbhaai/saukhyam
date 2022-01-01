<?php

namespace App\Http\Controllers;

use DB;
use File;
use Auth;
use App\Models\Faq;
use App\Models\User;
use App\Models\Basic;
use App\Models\Orders;
use App\Models\Network;
use App\Models\Language;
use App\Models\Products;
use App\Models\Profiles;
use App\Models\Workshop;
use App\Models\Tutorials;
use App\Models\ProductionCentre;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function admin(){
        $response = ['test' => 'Working successful.'];
        return response()->json($response, 201);
    }

    public function adminUsers(){
        $user       =   DB::table('users')
                        ->leftJoin('production_centres', 'production_centres.id', '=', 'users.fCentre')
                        ->leftJoin('users as c', 'c.id', '=', 'users.manager')
                        ->select([ 'users.id','users.name','users.email','users.phone','users.role', 'users.fCentre', 'users.manager', 'users.updated_at', 'production_centres.name as fCentreName', 'production_centres.city as fCentreLocation', 'c.name as managerName' ])
                        ->get();
        $basic = ProductionCentre::select('id','name')->get();
        $manager = User::select('id','name')->where('role', 'Manager')->get();
        return response()->json([
            'data'              => $user,
            'basic'             => $basic,
            'manager'           => $manager
        ]);
    }

    public function updateUser(Request $request){
        $dB                     =  User::find($request->id);
        $dB->role               =   $request->role;
        if($request->role == 'Amrita' || $request->role == 'Vijaya'){
            $dB->fCentre               =   $request->fCentre;
            $dB->manager               =   $request->manager;
        }else{
            $dB->fCentre               =   NULL;
        }
        $dB-> save();
        $data       =   DB::table('users')
                        ->leftJoin('production_centres', 'production_centres.id', '=', 'users.fCentre')
                        ->leftJoin('users as c', 'c.id', '=', 'users.manager')
                        ->where('users.id', $request->id)
                        ->select([ 'users.id','users.name','users.email','users.phone','users.role', 'users.fCentre', 'users.manager', 'users.updated_at', 'production_centres.name as fCentreName', 'production_centres.city as fCentreLocation', 'c.name as managerName' ])
                        ->get();
        $response = ['success'=>true, 'data'=>$data[0], 'message' => "User updated succesfully"];
        return response()->json($response, 201);
    }

    public function adminBasics(){
        $data = Basic::select('id','name','type','tab1','tab2', 'tab3', 'status', 'updated_at')->get()->map(function($i) {
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
        $dB->status             =   $request->status;
        $dB-> save();
        $data = Basic::limit(1)->orderBy('id', 'desc')->select('id','name','type','tab1','tab2', 'tab3', 'status', 'updated_at')->get()->map(function($i) {
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
        $dB->status             =   $request->status;
        $dB-> save();
        $data = Basic::where('id', $request->id)->select('id','name','type','tab1','tab2', 'tab3', 'status', 'updated_at')->get()->map(function($i) {
            if($i->type=='DimensionValue'){
                $xx   =   Basic::select('name as bName')->where( 'id', $i->tab1 )->first();
                $i['bName']  =   $xx->bName;
            }
            return $i;
        });
        $response = ['success'=>true, 'data'=>$data[0], 'message' => "Basic updated succesfully"];
        return response()->json($response, 201);
    }

    public function changeBasicStatus(Request $request){
        $dB                   =   Basic::find($request->id);
        $dB->status           =   $request->status;
        $dB-> save();
        $data = Basic::where('id', $request->id)->select('id','name','type','tab1','tab2', 'tab3', 'status', 'updated_at')->get()->map(function($i) {
            if($i->type=='DimensionValue'){
                $xx   =   Basic::select('name as bName')->where( 'id', $i->tab1 )->first();
                $i['bName']  =   $xx->bName;
            }
            return $i;
        });
        $response = ['success'=>true, 'data'=>$data[0], 'message'=>'Status Updated Succesfully'];
        return response()->json($response, 201);
    }

    public function adminProducts(){
        $data       =   DB::table('products')
                        ->leftJoin('basics', 'basics.id', '=', 'products.type')
                        ->select([ 'products.id', 'products.name', 'products.type', 'products.wprice', 'products.dprice', 'products.images', 'products.status', 'products.language',
                        'products.updated_at', 'basics.name as productType' ])
                        ->get();
        $type       = Basic::select('id', 'name', 'type')->where('type', 'ProductType')->orWhere('type', 'Language')->get();
        return response()->json([ 'data' => $data, 'type'=>$type ]); 
    }

    public function addProductOptions(){
        $data = Basic::select('id','name','type', 'tab1')->whereIn('type', ['ProductType', 'DimensionValue', 'DimensionType'])->get();
        $langOptions = Basic::select('id as value','name as text')->where('type', 'Language')->get();
        return response()->json([ 
            'data'              => $data,
            'langOptions'       => $langOptions,
        ]); 
    }

    public function createProduct(Request $request){
        $dB                                 =   new Products;
        $dB->type                           =   $request->type;
        $dB->name                           =   $request->name;
        $dB->wprice                         =   $request->wprice;
        $dB->dprice                         =   $request->dprice;
        $dB->status                         =   $request->status;
        $dB->distype                        =   $request->distype;
        $dB->discount                       =   $request->discount;
        $dB->language                       =   $request->language;
        $dB->short_description              =   $request->short_description;
        $dB->long_description               =   $request->long_description;
        $dB->dimension                      =   $request->dimension;
        $dB->mov                            =   $request->mov;
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
        $dB->wprice                         =   $request->wprice;
        $dB->dprice                         =   $request->dprice;
        $dB->status                         =   $request->status;
        $dB->distype                        =   $request->distype;
        $dB->discount                       =   $request->discount;
        $dB->language                       =   $request->language;
        $dB->short_description              =   $request->short_description;
        $dB->long_description               =   $request->long_description;
        $dB->dimension                      =   $request->dimension;
        $dB->language                       =   $request->language;
        $dB->mov                            =   $request->mov;
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
            $data = Products::where('id', $request->id)->select('id','name','type', 'wprice', 'dprice', 'images', 'status', 'updated_at')->first();
            $response = ['success'=>true, 'data'=>$data, 'message'=>'Status Updated Succesfully'];
        return response()->json($response, 201);
    }

    public function getProduct($id){
        $data = Basic::select('id','name','type', 'tab1')->whereIn('type', ['ProductType', 'DimensionValue', 'DimensionType'])->get();
        $langOptions = Basic::select('id as value','name as text')->where('type', 'Language')->get();
        $product = Products::where('id', $id)->get()->map(function($i) {
            $picArray = [];
            foreach (json_decode($i->images) as $j) { array_push($picArray, $j); }
            $i->picArray = $picArray;

            $oldLang = [];
            foreach (json_decode($i->language) as $j) {
                $xx   =   Basic::select('name as text', 'id as value')->where('id', $j)->first();
                array_push($oldLang, $xx);
            }
            $i->langData = json_encode($oldLang);
            $i->langArray = $oldLang;
            return $i;
        });
        $response = ['success' => true, 'data' => $data, 'product' => $product[0], 'langOptions' => $langOptions];
        return response()->json($response, 201);
    }

    public function adminTutorials(){
        $data = Tutorials::select('id','name','type','description','url','thumbnail', 'status', 'updated_at')->get();
        return response()->json([ 'data' => $data ]); 
    }

    public function createTutorial(Request $request){
        $dB                     =   new Tutorials;
        $dB->type               =   $request->type;
        $dB->name               =   $request->name;
        $dB->description        =   $request->description;
        $dB->status             =   $request->status;
        if($request->type=="Iframe"){
            $dB->url            =   $request->url;
        }else 
        if($request->type=="Video" || $request->type=="Doc"){
            if ($request->hasFile('file')) {
                $fileName = time() . '-file'.'.' . $request->file('file')->getClientOriginalExtension();
                $request->file('file')->move(storage_path('app/public/tutorial/'), $fileName); 
                $dB->url = $fileName;
            }
        } 
        if($request->type=="Video" || $request->type=="Iframe"){
            if ($request->hasFile('thumbnail')) {
                $fileName = time() . '-thumb'.'.' . $request->file('thumbnail')->getClientOriginalExtension();
                $request->file('thumbnail')->move(storage_path('app/public/tutorial/'), $fileName); 
                $dB->thumbnail = $fileName;
            }
        }
        $dB-> save();
        $data = Tutorials::limit(1)->orderBy('id', 'desc')->select('id','name','type','description','url', 'status', 'thumbnail', 'updated_at')->get();
        $response = ['success'=>true, 'data'=>$data[0], 'message' => "Creative created succesfully"];
        return response()->json($response, 201);
    }

    public function updateTutorial(Request $request){
        $dB                     =  Tutorials::find($request->id);
        $dB->type               =   $request->type;
        $dB->name               =   $request->name;
        $dB->status             =   $request->status;
        $dB->description        =   $request->description;
        if($request->type=="Iframe"){
            $dB->url            =   $request->url;
        }else 
        if($request->type=="Video" || $request->type=="Doc"){
            if ($request->hasFile('file')) {
                $fileName = time() . '-file'.'.' . $request->file('file')->getClientOriginalExtension();
                $request->file('file')->move(storage_path('app/public/tutorial/'), $fileName);
                if(!is_null($dB->url)){
                    $deleteImage = public_path("storage/tutorial/{$dB->url}");        
                    if (isset($deleteImage)) { file::delete($deleteImage); }
                }
                $dB->url = $fileName;
            }
        }
        if($request->type=="Video" || $request->type=="Iframe"){
            if ($request->hasFile('thumbnail')) {
                $fileName2 = time() . '-thumb'.'.' . $request->file('thumbnail')->getClientOriginalExtension();
                $request->file('thumbnail')->move(storage_path('app/public/tutorial/'), $fileName2);
                if(!is_null($dB->thumbnail)){
                    $deleteImage = public_path("storage/tutorial/{$dB->thumbnail}");        
                    if (isset($deleteImage)) { file::delete($deleteImage); }
                }
                $dB->thumbnail = $fileName2;
            }
        }
        $dB-> save();
        $data = Tutorials::where('id', $request->id)->select('id','name','type','description','url','status','thumbnail','updated_at')->get();
        $response = ['success'=>true, 'data'=>$data[0], 'message' => "Creative updated succesfully"];
        return response()->json($response, 201);
    }

    public function changeTutorialStatus(Request $request){
        $dB                   =   Tutorials::find($request->id);
        $dB->status           =   $request->status;
        $dB-> save();
        $data = Tutorials::where('id', $request->id)->select('id', 'name', 'type', 'description','url', 'status','updated_at')->first();
        $response = ['success'=>true, 'data'=>$data, 'message'=>'Tutorial Updated Succesfully'];
        return response()->json($response, 201);
    }

    public function adminLanguages(){
        $data       =   DB::table('languages')
                        ->leftJoin('basics', 'basics.id', '=', 'languages.screenId')
                        ->select([ 'languages.id', 'languages.screenId', 'languages.text', 'languages.options', 'languages.updated_at', 'basics.name as screenName' ])
                        ->get();
        $screen = Basic::select('id','name','type')->where('type', 'Screen')->get();
        $language = Basic::select('id','name','type')->where('type', 'Language')->where('status', 1)->get();

        return response()->json([ 'data' => $data, 'screen' => $screen, 'language' => $language]); 
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

    public function adminFaqs(){
        $data       =   DB::table('faqs')->leftJoin('users', 'users.id', '=', 'faqs.userId')
                        ->select([ 'faqs.*', 'users.name', 'users.email', 'users.phone', 'users.role'])
                        ->get();
        return response()->json([ 'data' => $data]); 
    }

    public function faqAdd(Request $request){
        $dB                         =   new Faq;
        $dB->userId                 =   Auth::user()->id;
        $dB->question               =   $request->question;
        $dB->status                 =   $request->status;
        $dB->answer                 =   $request->answer;

        $dB-> save();
        $data       =   DB::table('faqs')->leftJoin('users', 'users.id', '=', 'faqs.userId')
                        ->select([ 'faqs.*', 'users.name', 'users.email', 'users.phone', 'users.role'])
                        ->limit(1)->orderBy('id', 'desc')
                        ->get();
        $response = ['success'=>true, 'data'=>$data[0], 'message' => "FAQ created succesfully"];
        return response()->json($response, 201);
    } 

    public function faqQuestion(Request $request){        
        $id = Auth::user()->id;
        $dB                     =   new Faq;
        $dB->userId             =   Auth::user()->id;
        $dB->question           =   $request->question;
        $dB-> save();
        $response = ['success'=>true, 'id'=>$id, 'message' => "Ticket raised succesfully"];
        return response()->json($response, 201);
    }

    public function faqAnswer(Request $request){
        $dB                         =   Faq::find($request->id);
        $dB->question               =   $request->question;
        $dB->status                 =   $request->status;
        $dB->answer                 =   $request->answer;
        $dB-> save();
        $data = Faq::where('id', $request->id)->select('id','question','status', 'answer')->get();
        $response = ['success'=>true, 'data'=>$data[0], 'message' => "Answer submitted succesfully"];
        return response()->json($response, 201);
    }    

    public function changeFaqStatus(Request $request){
        $dB                   =   Faq::find($request->id);
        $dB->status           =   $request->status;
        $dB-> save();
        $data = Faq::where('id', $request->id)->select('id','question','status', 'answer')->first();
        $response = ['success'=>true, 'data'=>$data, 'message'=>'Status Updated Succesfully'];
        return response()->json($response, 201);
    }

    public function adminOrders(){
        $basic = Basic::select('id','name','type', 'tab1')->whereIn('type', ['FCentre'])->get();
        $data       =   DB::table('orders')->leftJoin('users', 'users.id', '=', 'orders.userId')->leftJoin('basics', 'basics.id', '=', 'orders.centre')
                        ->select([ 'orders.*', 'users.name', 'users.email', 'users.phone', 'users.role', 'basics.name as centreName', 'basics.tab1 as centreLocation'])
                        ->get()->map(function($i) {
                            $final = [];
                            for ($j=0; $j < count(json_decode($i->order)) ; $j++) {
                                $xx   =   Products::select('name as pName', 'images', 'dimension')->where( 'id', json_decode($i->order)[$j][0] )->first();
                                $cc = json_decode($i->order)[$j];
                                $image = json_decode($xx->images)[0];
                                array_push($cc, $xx->pName);
                                array_push($cc, $image);
                                array_push($cc, $xx->dimension);
                                array_push($final, $cc);
                            }
                            $i->order = json_encode($final);
                            return $i;
                        });

        return response()->json([ 'data' => $data, 'basic'=> $basic ]); 
    }

    public function createOrder(Request $request){
        $fc = Auth::user()->fCentre;
        $dB                     =   new Orders;
        $dB->userId             =   Auth::user()->id;
        $dB->order              =   $request->order;
        $dB->status             =   'Ordered';
        $dB->remarks            =   $request->remarks;
        if($fc){
            $dB->centre         =   $fc;
        }else{
            $dB->centre         =   1;
        }
        $dB-> save();        
        $response = ['success'=>true,  'message' => "Order created succesfully"];
        return response()->json($response, 201);
    }

    public function updateOrder(Request $request){
        $dB                         =   Orders::find($request->id);
        $dB->status                 =   $request->status;
        $dB->centre                 =   $request->centre;
        $dB->remarks                =   $request->remarks;
        $dB->shipping               =   $request->shipping;
        $dB-> save();

        $data       =   DB::table('orders')->leftJoin('users', 'users.id', '=', 'orders.userId')->leftJoin('basics', 'basics.id', '=', 'orders.centre')
                        ->where('orders.id', $request->id)
                        ->select([ 'orders.*', 'users.name', 'users.email', 'users.phone', 'basics.name as centreName', 'basics.tab1 as centreLocation'])
                        ->get()->map(function($i) {
                            $final = [];
                            for ($j=0; $j < count(json_decode($i->order)) ; $j++) {
                                $xx   =   Products::select('name as pName', 'images', 'dimension')->where( 'id', json_decode($i->order)[$j][0] )->first();
                                $cc = json_decode($i->order)[$j];
                                $image = json_decode($xx->images)[0];
                                array_push($cc, $xx->pName);
                                array_push($cc, $image);
                                array_push($cc, $xx->dimension);
                                array_push($final, $cc);
                            }
                            $i->order = json_encode($final);
                            return $i;
                        });
        $response = ['success'=>true, 'data'=>$data[0], 'message' => "Order updated succesfully"];
        return response()->json($response, 201);
    }

    public function adminCentres(){
        $data = ProductionCentre::select('id','name','state','city','pin','address','team','updated_at')->get();
        return response()->json([ 'data' => $data ]); 
    }

    public function createCentre(Request $request){
        $dB                     =   new ProductionCentre;
        $dB->name               =   $request->name;
        $dB->state              =   $request->state;
        $dB->city               =   $request->city;
        $dB->address            =   $request->address;
        $dB->pin                =   $request->pin;
        $dB->team               =   $request->team;
        $dB-> save();
        $data = ProductionCentre::limit(1)->orderBy('id', 'desc')->select('id','name','state','city','pin','address','team','updated_at')->get();
        $response = ['success'=>true, 'data'=>$data[0], 'message' => "Centre created succesfully"];
        return response()->json($response, 201);
    }

    public function updateCentre(Request $request){
        $dB                     =  ProductionCentre::find($request->id);
        $dB->name               =   $request->name;
        $dB->state              =   $request->state;
        $dB->city               =   $request->city;
        $dB->address            =   $request->address;
        $dB->pin                =   $request->pin;
        $dB->team               =   $request->team;
        $dB-> save();
        $data = ProductionCentre::where('id', $request->id)->select('id','name','state','city','pin','address','team','updated_at')->get();
        $response = ['success'=>true, 'data'=>$data[0], 'message' => "Centre updated succesfully"];
        return response()->json($response, 201);
    }

    public function adminNetworks(){
        $data       =   DB::table('users')->whereIn('role', ['Amrita', 'Vijaya'])->leftJoin('networks as a', 'a.userId', '=', 'users.id')
                        ->select([ 'users.id as userId','users.name','users.email','users.phone','users.role', 'users.fCentre', 'users.updated_at', 'a.id as networkId', 'a.manager' ])
                        ->get()->map(function($i) {
                            if($i->manager){
                                $xx   =   User::select('name')->where( 'id', $i->manager )->first();
                                $i->managerName  =   $xx->name;
                            }
                            return $i;
                        });
        $manager = User::select('id','name')->where('role', 'Manager')->get();
        return response()->json([ 
            'data'              => $data, 
            'manager'           => $manager
            ]); 
    }

    public function updateNetwork(Request $request){
        if($request->id){
            $dB                     =   Network::find($request->id);
        }else{
            $dB                     =   new Network;
        }
        $dB->userId                 =   $request->userId;
        $dB->manager                =   $request->manager;
        $dB-> save();
        $data       =   DB::table('users')->where('userId', $request->userId)->leftJoin('networks as a', 'a.userId', '=', 'users.id')
                    ->select([ 'users.id as userId','users.name','users.email','users.phone','users.role', 'users.fCentre', 'users.updated_at', 'a.id as networkId', 'a.manager' ])
                    ->get()->map(function($i) {
                        if($i->manager){
                            $xx   =   User::select('name')->where( 'id', $i->manager )->first();
                            $i->managerName  =   $xx->name;
                        }
                        return $i;
                    });
        $response = ['success'=>true, 'data'=>$data[0], 'message' => "Centre updated succesfully"];
        return response()->json($response, 201);
    }

    public function adminWorkshop(){
        $data       =   DB::table('workshops as a')->leftJoin('users as b', 'a.userId', '=', 'b.id')
                        ->select([ 'b.name','b.email','b.phone','b.role', 'a.id', 'a.userId', 'a.village', 'a.date', 'a.attendance', 'a.sets', 'a.pic', 'a.updated_at' ])
                        ->get();
        return response()->json([ 'data' => $data ]); 
    }

    // For App
    public function faqs(){
        $data       =   Faq::select(['question', 'answer', 'updated_at'])->where('status', 1)->get();
        return response()->json([ 'data' => $data]); 
    }
    
    public function shop(){
        $data       =   DB::table('products')
                        ->leftJoin('basics', 'basics.id', '=', 'products.type')
                        ->select([ 'products.id', 'products.name', 'products.type', 'products.wprice', 'products.dprice', 'products.images', 'products.status', 'products.language',
                        'products.updated_at', 'basics.name as productType' ])
                        ->get()->map(function($i) {
                            if($i->images){ $i->imgArray = json_decode($i->images); }
                            return $i;
                        });
        $type       = Basic::select('id', 'name', 'type')->where('type', 'ProductType')->orWhere('type', 'Language')->get();
        return response()->json([ 'data' => $data, 'type'=>$type ]); 
    } 

    public function languages(){
        $data       =   Basic::where('type', 'Language')->where('status', 1)->select(['id', 'name'])->get();
        return response()->json([ 'data' => $data]); 
    }

    public function singleProduct($id){
        $data       =   Products::where('id', $id)->select(['*'])->get()->map(function($i) {
            if($i->images){ 
                $i->imgArray = json_decode($i->images);
                $i->dimArray = json_decode($i->dimension);
            }
            return $i;
        });
        return response()->json([ 'data' => $data]);
    }

    public function tutorials(){
        $videos     =   Tutorials::select(['id','type', 'name', 'description', 'url', 'thumbnail'])
                            ->where('status', 1)->where('type', 'Video')->orWhere('type', 'Iframe')->get();
        $docs       =   Tutorials::select(['id','type', 'name', 'description', 'url', 'thumbnail'])->where('status', 1)->where('type', 'Doc')->get();
        return response()->json([
            'videos' => $videos,
            'docs'=> $docs
        ]);
    }

    public function askQuestion(Request $request){
        $dB                         =   new Faq;
        $dB->userId                 =   Auth::user()->id;
        $dB->question               =   $request->question;
        $dB-> save();        
        $response = ['success'=>true, 'message' => "FAQ created succesfully"];
        return response()->json($response, 201);
    } 

    public function workshop(Request $request){
        $dB                         =   new Workshop;
        $dB->userId                 =   Auth::user()->id;
        $dB->village                =   $request->village;
        $dB->date                   =   $request->date;
        $dB->attendance             =   $request->attendance;
        $dB->sets                   =   $request->sets;
        if ($request->hasFile('images')) {
            $count = 0;
            $imageArray = [];
            foreach ($request->file('images') as $file) {
                $count = $count + 1;
                $fileName = time() . '-' . $count . '.' . $file->getClientOriginalExtension();
                $file->move(storage_path('app/public/workshop/'), $fileName);    
                $imageArray[] = $fileName;
            }
            $dB->pic = json_encode($imageArray);
        }
        $dB-> save();        
        $response = ['success'=>true, 'message' => "Form submitted succesfully"];
        return response()->json($response, 201);
    }
    
    // For App

}