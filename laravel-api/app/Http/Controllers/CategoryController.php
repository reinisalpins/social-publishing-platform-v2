<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\Categories\CategoryResource;
use App\Http\Resources\Categories\CategoryResourceCollection;
use App\Http\Resources\Posts\PostResourceCollection;
use App\Models\Category;
use App\Services\CategoryService;
use App\Services\PostService;

class CategoryController
{
    public function __construct(
        private readonly CategoryService $categoryService,
        private readonly PostService $postService
    ) {}

    public function index(): CategoryResourceCollection
    {
        return CategoryResourceCollection::make($this->categoryService->getAll());
    }

    public function show(Category $category): CategoryResource
    {
        return CategoryResource::make($category);
    }

    public function posts(Category $category): PostResourceCollection
    {
        return PostResourceCollection::make($this->postService->getCategoryPostsWithRelations($category));
    }
}
