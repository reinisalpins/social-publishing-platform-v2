<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\User\CreateUserData;
use App\Data\User\UpdateUserData;
use App\Models\User;

class UserService
{
    public function __construct(
        private readonly User $user
    ) {}

    public function update(User $user, UpdateUserData $data): User
    {
        $user->update([
            'name' => $data->name,
            'email' => $data->email,
        ]);

        return $user;
    }

    public function updatePassword(User $user, string $newPassword): void
    {
        $user->update(['password' => $newPassword]);
    }

    public function create(CreateUserData $data): User
    {
        return $this->user->create([
            'name' => $data->name,
            'email' => $data->email,
            'password' => $data->password,
        ]);
    }
}
