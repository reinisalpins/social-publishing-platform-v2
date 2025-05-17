<?php

declare(strict_types=1);

namespace App\Http\Resources\Posts;

use App\Http\Resources\Categories\CategoryResourceCollection;
use App\Http\Resources\Comments\CommentResourceCollection;
use App\Http\Resources\UserResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /** @var Post */
    public $resource;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'title' => $this->resource->title,
            'content' => $this->resource->content,
            'userId' => $this->resource->user_id,
            'categories' => CategoryResourceCollection::make($this->whenLoaded('categories')),
            'comments' => CommentResourceCollection::make($this->whenLoaded('comments')),
            'commentsCount' => $this->whenCounted('comments'),
            'user' => UserResource::make($this->whenLoaded('user')),
            'createdAt' => $this->resource->created_at,
        ];
    }
}
