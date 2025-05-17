<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\Posts\PostResourceCollection;
use App\Models\Category;

class CategoryPostController
{
    public function index(Category $category): PostResourceCollection
    {
        return PostResourceCollection::make(
            $category->posts()->with(['categories', 'user'])->withCount('comments')->get()
        );
    }
}
