<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    
    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if($validator->fails()){
            return response()->json(['err'=>  $validator->errors()]);
        }

        $existingUser = User::where('email', $request->email)->first();
    
        if ($existingUser) {
            return response()->json(['err' => 'Email already exists!'], 400);
        }

        $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'passwordTxt' => $request->password,
        'role' => 'user',
        
        ]);
      
        return response()->json(['user' => $user, 'msg' => 'User registered successfully!']);
    }


    public function signin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
    
        
        $credentials = $request->only('email', 'password');
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }
    
        $user = Auth::user();
    
        return response()->json([
            'user' => $user,
            'tokenId' => $token,
        ]);
    }
    


public function getAllUsers()
{
    $users = User::get();
    return response()->json(['users' => $users]);
}

public function getUser($id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json(['err' => 'User not found'], 404);
    }

    return response()->json(['user' => $user]);
}

public function deleteUser($id)
{
    $user = User::where('id', $id)->first();

    if(!$user){
        return response()->json(['err' => 'User is not found!'], 401);
    }

    $user->delete();
    return response()->json(['User is deleted!']);
}

public function updateUser(Request $request, $id)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required',
        'email' => 'required|email',
        'password' => 'required',
        'role' => 'required',
    ]);

    if ($validator->fails()) {
        return response()->json(['err' => $validator->errors()]);
    }

    $user = User::find($id);

    if (!$user) {
        return response()->json(['err' => 'User not found'], 404);
    }

    $user->name = $request->name;
    $user->email = $request->email;
    $user->password = Hash::make($request->password);
    $user->passwordTxt = $request->password;       
    $user->role = $request->role;

    $user->save();

    return response()->json(['user' => $user, 'msg' => 'User updated successfully!']);
}
}
