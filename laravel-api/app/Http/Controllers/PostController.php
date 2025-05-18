<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Posts\StorePostRequest;
use App\Http\Requests\Posts\UpdatePostRequest;
use App\Http\Resources\Posts\PostResource;
use App\Http\Resources\Posts\PostResourceCollection;
use App\Models\Post;
use App\Models\User;
use App\Services\PostService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PostController
{
    public function __construct(
        private readonly PostService $postService
    ) {}

    public function store(StorePostRequest $request): PostResource
    {
        $post = $this->postService->createPost($request->getData());

        return PostResource::make($post);
    }

    public function update(UpdatePostRequest $request, Post $post): PostResource
    {
        $post = $this->postService->updatePost($post, $request->getData());

        return PostResource::make($post);
    }

    public function showFull(Post $post): PostResource
    {
        return PostResource::make($this->postService->loadAllRelations($post));
    }

    public function destroy(Post $post): Response
    {
        $this->postService->deletePost($post);

        return response(status: Response::HTTP_NO_CONTENT);
    }

    public function index(): PostResourceCollection
    {
        return PostResourceCollection::make($this->postService->getAllPostsWithRelations());
    }

    public function search(Request $request): PostResourceCollection
    {
        $query = $request->query('query');

        if (! $query) {
            return PostResourceCollection::make([]);
        }

        return PostResourceCollection::make($this->postService->search($query));
    }

    public function userPosts(User $user): PostResourceCollection
    {
        return PostResourceCollection::make($this->postService->getLatestUserPostsWithRelations($user));
    }

    public function authUserPosts(Request $request): PostResourceCollection
    {
        return PostResourceCollection::make($this->postService->getUserPosts($request->user()));
    }

    public function showWithCategories(Post $post): PostResource
    {
        return PostResource::make($post->load('categories'));
    }
}
