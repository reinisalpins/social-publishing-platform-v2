<?php

declare(strict_types=1);

namespace App\Http\Resources\Comments;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CommentResourceCollection extends ResourceCollection
{
    public $collects = CommentResource::class;
}
