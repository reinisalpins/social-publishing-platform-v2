<?php

declare(strict_types=1);

namespace App\Http\Resources\Posts;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PostResourceCollection extends ResourceCollection
{
    public $collects = PostResource::class;
}
