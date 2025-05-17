<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\Posts\PostResource;
use App\Http\Resources\Posts\PostResourceCollection;
use App\Models\Post;
use Illuminate\Http\Request;

class UserPostController
{
    public function index(Request $request): PostResourceCollection
    {
        $posts = $request->user()->posts()->get();

        return PostResourceCollection::make($posts);
    }

    public function show(Post $post): PostResource
    {
        return PostResource::make($post->load('categories'));
    }
}
