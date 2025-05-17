<?php

declare(strict_types=1);

namespace App\Http\Resources\Comments;

use App\Http\Resources\UserResource;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /** @var Comment */
    public $resource;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'content' => $this->resource->content,
            'userId' => $this->resource->user_id,
            'postId' => $this->resource->post_id,
            'user' => UserResource::make($this->whenLoaded('user')),
            'createdAt' => $this->resource->created_at,
        ];
    }
}
