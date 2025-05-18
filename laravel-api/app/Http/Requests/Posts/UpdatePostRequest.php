<?php

declare(strict_types=1);

namespace App\Http\Requests\Posts;

use App\Data\Post\UpdatePostData;
use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePostRequest extends FormRequest
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

    public function getData(): UpdatePostData
    {
        return new UpdatePostData(
            title: $this->input('title'),
            content: $this->input('content'),
            categoryIds: $this->input('categories'),
        );
    }
}
