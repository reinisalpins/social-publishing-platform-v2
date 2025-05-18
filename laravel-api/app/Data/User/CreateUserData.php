<?php

declare(strict_types=1);

namespace App\Data\User;

class CreateUserData
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
        public readonly string $password,
    ) {}
}
