<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\Post\CreatePostData;
use App\Data\Post\UpdatePostData;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class PostService
{
    public function __construct(
        private readonly Post $post
    ) {}

    public function createPost(CreatePostData $data): Post
    {
        $post = $this->post->create([
            'title' => $data->title,
            'content' => $data->content,
            'user_id' => $data->userId,
        ]);

        $post->categories()->attach($data->categoryIds);

        return $post;
    }

    public function updatePost(Post $post, UpdatePostData $data): Post
    {
        $post->update([
            'title' => $data->title,
            'content' => $data->content,
        ]);

        $post->categories()->sync($data->categoryIds);

        return $post;
    }

    public function deletePost(Post $post): void
    {
        $post->delete();
    }

    public function search(string $query): Collection
    {
        return $this->post->query()
            ->where(function (Builder $builder) use ($query) {
                $builder->where('title', 'like', "%$query%")
                    ->orWhere('content', 'like', "%$query%");
            })
            ->with(['categories', 'user'])
            ->withCount('comments')
            ->get();
    }

    public function loadAllRelations(Post $post): Post
    {
        return $post->load(['categories', 'comments', 'comments.user', 'user'])->loadCount('comments');
    }

    public function getUserPostsWithRelations(User $user): Collection
    {
        return $user->posts()->with(['categories', 'user'])->withCount('comments')->get();
    }

    public function getAllPostsWithRelations(): Collection
    {
        return $this->post->with(['categories', 'user'])->withCount('comments')->get();
    }

    public function getUserPosts(User $user): Collection
    {
        return $user->posts()->get();
    }

    public function getCategoryPostsWithRelations(Category $category): Collection
    {
        return $category->posts()->with(['categories', 'user'])->withCount('comments')->get();
    }
}
