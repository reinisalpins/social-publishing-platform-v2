<?php

declare(strict_types=1);

namespace App\Data\User;

class UpdateUserData
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
    ) {}
}
