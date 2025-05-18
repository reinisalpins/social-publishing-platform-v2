<?php

declare(strict_types=1);

namespace App\Data\Comment;

class CreateCommentData
{
    public function __construct(
        public readonly string $content,
        public readonly int $userId,
    ) {}
}
