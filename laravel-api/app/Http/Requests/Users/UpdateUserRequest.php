<?php

declare(strict_types=1);

namespace App\Http\Requests\Users;

use App\Data\User\UpdateUserData;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'email' => [
                'required',
                'string',
                'email',
                Rule::unique('users')->ignore($this->user()->id),
            ],
        ];
    }

    public function getData(): UpdateUserData
    {
        return new UpdateUserData(
            name: $this->input('name'),
            email: $this->input('email')
        );
    }
}
