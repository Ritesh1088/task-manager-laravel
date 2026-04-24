<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // validation
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // login check
        if (!Auth::attempt($request->only('email','password'))) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid Credentials'
            ],401);
        }

        $user = Auth::user();

        // token generate
        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Login Successful',
            'user' => $user,
            'token' => $token
        ]);
    }
}