<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Users\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

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
}
