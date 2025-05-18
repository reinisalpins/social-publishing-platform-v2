<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Users\UpdatePasswordRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController
{
    public function __construct(
        private readonly UserService $userService
    ) {}

    public function show(User $user): UserResource
    {
        return UserResource::make($user);
    }

    public function getAuthUser(Request $request): UserResource
    {
        return UserResource::make($request->user());
    }

    public function updateAuthUser(UpdateUserRequest $request): UserResource
    {
        return UserResource::make($this->userService->update($request->user(), $request->getData()));
    }

    public function updateAuthUserPassword(UpdatePasswordRequest $request): Response
    {
        $this->userService->updatePassword($request->user(), $request->input('new_password'));

        return response(status: Response::HTTP_NO_CONTENT);
    }
}
