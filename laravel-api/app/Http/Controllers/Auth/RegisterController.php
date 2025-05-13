<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Auth;
use Illuminate\Http\Response;

class RegisterController
{
    public function __invoke(RegisterRequest $request): Response
    {
        $user = User::create($request->validated());

        Auth::login($user);

        return response(status: Response::HTTP_CREATED);
    }
}
