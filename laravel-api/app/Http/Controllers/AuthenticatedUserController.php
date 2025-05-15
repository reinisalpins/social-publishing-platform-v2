<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Users\UpdatePasswordRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthenticatedUserController
{
    public function show(Request $request): UserResource
    {
        return UserResource::make($request->user());
    }

    public function update(UpdateUserRequest $request): UserResource
    {
        $user = $request->user();

        $user->update($request->validated());

        return UserResource::make($user->fresh());
    }

    public function updatePassword(UpdatePasswordRequest $request): Response
    {
        $user = $request->user();

        $user->update([
            'password' => $request->input('new_password')
        ]);

        return response(status: Response::HTTP_NO_CONTENT);
    }
}
