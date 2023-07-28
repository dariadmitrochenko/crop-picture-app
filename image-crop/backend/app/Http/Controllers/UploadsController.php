<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

use App\Models\Uploads;

class UploadsController extends Controller
{
    public function authenticatedUserDetails(){
        Log::debug('UploadsController.authenticatedUserDetails');
        //returns details
        return response()->json(['authenticated-user' => auth()->user()], 200);
    }

    public function uploadImage() {
        try {
            
            $imageArr = request()->get('imagefile');
            if (is_array($imageArr)) {
                foreach ($imageArr as $key => $image) {
                    Log::info('Info:' . $key . substr($image, 0 , 5) . "\n");
    
                    $ext = explode('/',explode(':', substr($imageArr[$key], 0, strpos($imageArr[$key], ';')))[1])[1];
    
                    $image = preg_replace("/^data:image\/[a-z]+;base64,/i", "", $image);
                    $image = str_replace(' ', '+', $image);
                    $imageName = uniqid('user_image_' . request()->get('imagetext')) . '.' . $ext;
                    \File::put(storage_path(). '/' . $imageName, base64_decode($image));
    
    
                    // Get current user...
                    $_user = Auth::user();
    
                    // Get user's ID...
                    $_id = Auth::id();
    
                    $userUpload = new Uploads();
    
                    $userUpload->name = $imageName;
                    $userUpload->user_id = $_id;
                    $userUpload->url = storage_path() . '/' . $imageName;
                }
            } else {
                throw new Error();
            }
            

            return response()->json('Successfully added');
        } catch (\Throwable $th) {
            Log::error('ERR: ' . $th->getMessage());

            return response('Try again' . $th->getMessage(), 400)->header('Content-Type', 'text/plain');
        }
    }
}