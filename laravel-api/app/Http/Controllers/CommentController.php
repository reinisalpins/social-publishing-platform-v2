<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Comments\StoreCommentRequest;
use App\Models\Comment;
use App\Models\Post;
use App\Services\CommentService;
use Illuminate\Http\Response;

class CommentController
{
    public function __construct(
        private readonly CommentService $commentService
    ) {}

    public function store(StoreCommentRequest $request, Post $post): Response
    {
        $this->commentService->createComment($post, $request->getData());

        return response(status: Response::HTTP_CREATED);
    }

    public function destroy(Comment $comment): Response
    {
        $this->commentService->deleteComment($comment);

        return response(status: Response::HTTP_NO_CONTENT);
    }
}
