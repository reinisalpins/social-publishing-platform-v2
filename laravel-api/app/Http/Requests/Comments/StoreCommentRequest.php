<?php

declare(strict_types=1);

namespace App\Http\Requests\Comments;

use App\Data\Comment\CreateCommentData;
use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'content' => ['required', 'string', 'max:255'],
        ];
    }

    public function getData(): CreateCommentData
    {
        return new CreateCommentData(
            content: $this->input('content'),
            userId: $this->user()->id,
        );
    }
}
