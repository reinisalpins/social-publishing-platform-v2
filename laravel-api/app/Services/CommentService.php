<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\Comment\CreateCommentData;
use App\Models\Comment;
use App\Models\Post;

class CommentService
{
    public function createComment(Post $post, CreateCommentData $data): void
    {
        $post->comments()->create([
            'content' => $data->content,
            'user_id' => $data->userId,
        ]);
    }

    public function deleteComment(Comment $comment): void
    {
        $comment->delete();
    }
}
