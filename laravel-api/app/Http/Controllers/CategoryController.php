<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\Categories\CategoryResource;
use App\Http\Resources\Categories\CategoryResourceCollection;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController
{
    public function index(): CategoryResourceCollection
    {
        return CategoryResourceCollection::make(Category::all());
    }

    public function show(Category $category): CategoryResource
    {
        return CategoryResource::make($category);
    }
}
