<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;

class UserController
{
    public function show(User $user): UserResource
    {
        return UserResource::make($user);
    }
}
