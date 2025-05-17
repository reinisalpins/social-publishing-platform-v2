<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Posts\StorePostRequest;
use App\Http\Requests\Posts\UpdatePostRequest;
use App\Http\Resources\Posts\PostResource;
use App\Http\Resources\Posts\PostResourceCollection;
use App\Models\Post;
use Illuminate\Http\Response;

class PostController
{
    public function store(StorePostRequest $request): PostResource
    {
        $post = Post::create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'user_id' => $request->user()->id,
        ]);

        $post->categories()->attach($request->input('categories'));

        return PostResource::make($post);
    }

    public function update(UpdatePostRequest $request, Post $post): PostResource
    {
        $post->update([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
        ]);

        $post->categories()->sync($request->input('categories'));

        return PostResource::make($post);
    }

    public function show(Post $post): PostResource
    {
        return PostResource::make(
            $post->load(['categories', 'comments', 'comments.user', 'user'])->loadCount('comments')
        );
    }

    public function destroy(Post $post): Response
    {
        $post->delete();

        return response(status: Response::HTTP_NO_CONTENT);
    }

    public function index(): PostResourceCollection
    {
        return PostResourceCollection::make(Post::with(['categories', 'user'])->withCount('comments')->get());
    }
}
