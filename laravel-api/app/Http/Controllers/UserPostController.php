<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\Posts\PostResourceCollection;
use App\Models\User;

class UserPostController
{
    public function index(User $user): PostResourceCollection
    {
        return PostResourceCollection::make(
            $user->posts()->with(['categories', 'user'])->withCount('comments')->get()
        );
    }
}
