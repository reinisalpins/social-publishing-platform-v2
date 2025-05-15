<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\Categories\CategoryResourceCollection;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController
{
    public function index(Request $request): CategoryResourceCollection
    {
        return CategoryResourceCollection::make(Category::all());
    }
}
