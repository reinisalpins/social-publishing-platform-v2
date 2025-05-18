<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Requests\Auth\RegisterRequest;
use App\Services\UserService;
use Auth;
use Illuminate\Http\Response;

class RegisterController
{
    public function __construct(
        private readonly UserService $userService
    ) {}

    public function __invoke(RegisterRequest $request): Response
    {
        $user = $this->userService->create($request->getData());

        Auth::login($user);

        return response(status: Response::HTTP_CREATED);
    }
}
