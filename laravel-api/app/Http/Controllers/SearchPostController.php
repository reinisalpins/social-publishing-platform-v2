<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\Posts\PostResourceCollection;
use App\Models\Post;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class SearchPostController
{
    public function __invoke(Request $request): PostResourceCollection
    {
        $query = $request->query('query');

        if (! $query) {
            return PostResourceCollection::make([]);
        }

        $posts = Post::query()
            ->where(function (Builder $builder) use ($query) {
                $builder->where('title', 'like', "%$query%")
                    ->orWhere('content', 'like', "%$query%");
            })
            ->with(['categories', 'user'])
            ->withCount('comments')
            ->get();

        return PostResourceCollection::make($posts);
    }
}
