<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Comments\StoreCommentRequest;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Response;

class CommentController
{
    public function store(StoreCommentRequest $request, Post $post): Response
    {
        $post->comments()->create([
            'content' => $request->input('content'),
            'user_id' => $request->user()->id,
        ]);

        return response(status: Response::HTTP_CREATED);
    }

    public function destroy(Comment $comment): Response
    {
        $comment->delete();

        return response(status: Response::HTTP_NO_CONTENT);
    }
}
