<?php

declare(strict_types=1);

namespace App\Http\Requests\Posts;

use App\Data\Post\CreatePostData;
use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePostRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => ['required', 'max:255', 'string'],
            'content' => ['required', 'string'],
            'categories' => ['required', 'array', 'min:1'],
            'categories.*' => ['required', 'integer', Rule::exists(Category::class, 'id')],
        ];
    }

    public function getData(): CreatePostData
    {
        return new CreatePostData(
            title: $this->input('title'),
            content: $this->input('content'),
            userId: $this->user()->id,
            categoryIds: $this->input('categories'),
        );
    }
}
