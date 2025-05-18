<?php

declare(strict_types=1);

namespace App\Http\Requests\Auth;

use App\Data\User\CreateUserData;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'unique:users'],
            'name' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }

    public function getData(): CreateUserData
    {
        return new CreateUserData(
            name: $this->input('name'),
            email: $this->input('email'),
            password: $this->input('password')
        );
    }
}
