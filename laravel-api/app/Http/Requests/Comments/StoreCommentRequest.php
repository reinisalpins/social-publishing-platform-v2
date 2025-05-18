<?php

declare(strict_types=1);

namespace App\Http\Requests\Comments;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'content' => ['required', 'string', 'max:255'],
        ];
    }
}
