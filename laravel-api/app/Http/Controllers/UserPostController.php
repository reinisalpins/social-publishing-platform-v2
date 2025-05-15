<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\Posts\PostResourceCollection;
use Illuminate\Http\Request;

class UserPostController
{
    public function index(Request $request): PostResourceCollection
    {
        $posts = $request->user()->posts()->with('categories')->get();

        return PostResourceCollection::make($posts);
    }
}
