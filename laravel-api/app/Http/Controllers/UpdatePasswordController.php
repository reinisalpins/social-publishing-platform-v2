<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Users\UpdatePasswordRequest;
use Illuminate\Http\Response;

class UpdatePasswordController
{
    public function __invoke(UpdatePasswordRequest $request)
    {
        $user = $request->user();

        $user->update([
            'password' => $request->input('new_password'),
        ]);

        return response(status: Response::HTTP_NO_CONTENT);
    }
}
