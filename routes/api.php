<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;

Route::post('/register', 'App\Http\Controllers\AuthController@register');
Route::post('/login', 'App\Http\Controllers\AuthController@login');
Route::post('/forgotPassword', 'App\Http\Controllers\AuthController@forgotPassword');
Route::post('/forgotPasswordApp', 'App\Http\Controllers\AuthController@forgotPasswordApp');
Route::post('/resetPassword', 'App\Http\Controllers\AuthController@resetPassword');
Route::get('/admin', 'App\Http\Controllers\AdminController@admin');
Route::get('/test', 'App\Http\Controllers\AuthController@test');
// Route::get('/getProduct/{id}', 'App\Http\Controllers\AdminController@admin');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Admin
    Route::get('/adminUsers', [AdminController::class, 'adminUsers']);
    Route::post('/updateUser', [AdminController::class, 'updateUser']);

    Route::get('/adminBasics', [AdminController::class, 'adminBasics']);
    Route::post('/createBasic', [AdminController::class, 'createBasic']);
    Route::post('/updateBasic', [AdminController::class, 'updateBasic']);
    Route::post('/changeBasicStatus', [AdminController::class, 'changeBasicStatus']);

    Route::get('/adminProducts', [AdminController::class, 'adminProducts']);
    Route::get('/addProductOptions', [AdminController::class, 'addProductOptions']); 
    Route::post('/changeProductStatus', [AdminController::class, 'changeProductStatus']);
    Route::post('/createProduct', [AdminController::class, 'createProduct']);
    Route::get('/getProduct/{id}', [AdminController::class, 'getProduct']);
    Route::post('/updateProduct', [AdminController::class, 'updateProduct']);

    Route::get('/productLanguages', [AdminController::class, 'productLanguages']);
    Route::get('/addProductLanguageOptions', [AdminController::class, 'addProductLanguageOptions']); 
    Route::post('/createProductLanguage', [AdminController::class, 'createProductLanguage']);
    Route::get('/getProductLanguage/{id}', [AdminController::class, 'getProductLanguage']);
    Route::get('/getPendingLanguages/{id}', [AdminController::class, 'getPendingLanguages']);
    Route::post('/updateProductLanguage', [AdminController::class, 'updateProductLanguage']);
    Route::post('/changeProductLanguageStatus', [AdminController::class, 'changeProductLanguageStatus']);

    Route::get('/adminTutorials', [AdminController::class, 'adminTutorials']);
    Route::post('/createTutorial', [AdminController::class, 'createTutorial']);
    Route::post('/updateTutorial', [AdminController::class, 'updateTutorial']);
    Route::post('/changeTutorialStatus', [AdminController::class, 'changeTutorialStatus']);

    Route::get('/adminLanguages', [AdminController::class, 'adminLanguages']);
    Route::post('/createLanguage', [AdminController::class, 'createLanguage']);
    Route::post('/updateLanguage', [AdminController::class, 'updateLanguage']);

    Route::get('/adminFaqs', [AdminController::class, 'adminFaqs']);
    Route::post('/faqAdd', [AdminController::class, 'faqAdd']);
    Route::post('/faqAnswer', [AdminController::class, 'faqAnswer']);
    Route::post('/changeFaqStatus', [AdminController::class, 'changeFaqStatus']);    
    
    Route::get('/adminOrders', [AdminController::class, 'adminOrders']);
    Route::post('/updateOrder', [AdminController::class, 'updateOrder']);
    
    Route::get('/adminCentres', [AdminController::class, 'adminCentres']);
    Route::post('/createCentre', [AdminController::class, 'createCentre']);
    Route::post('/updateCentre', [AdminController::class, 'updateCentre']);
    
    Route::get('/adminNetworks', [AdminController::class, 'adminNetworks']);
    Route::post('/updateNetwork', [AdminController::class, 'updateNetwork']);

    Route::get('/adminWorkshop', [AdminController::class, 'adminWorkshop']);

    Route::get('/adminVideos', [AdminController::class, 'adminVideos']);
    Route::post('/createVideo', [AdminController::class, 'createVideo']);
    Route::post('/updateVideo', [AdminController::class, 'updateVideo']);
    
    Route::get('/adminContact', [AdminController::class, 'adminContact']);
    Route::get('/adminRating', [AdminController::class, 'adminRating']);

    Route::get('/adminNotification', [AdminController::class, 'adminNotification']);
    Route::post('/createNotification', [AdminController::class, 'createNotification']);
    Route::post('/updateNotification', [AdminController::class, 'updateNotification']);
    Route::post('/changeNotificationStatus', [AdminController::class, 'changeNotificationStatus']);
    // Admin
    
    // for APP
    Route::post('/faqQuestion', [AdminController::class, 'faqQuestion']);
    Route::post('/createOrder', [AdminController::class, 'createOrder']);
    Route::post('/askQuestion', [AdminController::class, 'askQuestion']);
    Route::post('/workshop', [AdminController::class, 'workshop']);
    Route::post('/changeLanguage', [AdminController::class, 'changeLanguage']);
    Route::post('/createProfile', [AdminController::class, 'createProfile']);
    Route::get('/myOrders', [AdminController::class, 'myOrders']);
    Route::get('/getProfile', [AdminController::class, 'getProfile']);    
}); 
Route::get('/order/{id}', [AdminController::class, 'singleOrder']);

Route::post('/createRating', [AdminController::class, 'createRating']);
Route::get('/shop', [AdminController::class, 'shop']);
Route::get('/videos', [AdminController::class, 'videos']);
Route::get('/singleProduct/{id}', [AdminController::class, 'singleProduct']);
Route::get('/homeData', [AdminController::class, 'homeData']);
Route::get('/faqs', [AdminController::class, 'faqs']);
Route::get('/langShop', [AdminController::class, 'langShop']);
Route::get('/langSingleProduct/{id}', [AdminController::class, 'langSingleProduct']);
Route::get('/languages', [AdminController::class, 'languages']);
Route::get('/tutorials', [AdminController::class, 'tutorials']);
Route::get('/languageTranslation', [AdminController::class, 'languageTranslation']);
Route::get('/videoLang/{id}', [AdminController::class, 'videoLang']);
Route::post('/createContact', [AdminController::class, 'createContact']);
Route::get('/notifications', [AdminController::class, 'notifications']);