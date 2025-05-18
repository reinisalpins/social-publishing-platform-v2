<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

class CategoryService
{
    public function __construct(
        private readonly Category $category
    ) {}

    public function getAll(): Collection
    {
        return $this->category->get();
    }
}
