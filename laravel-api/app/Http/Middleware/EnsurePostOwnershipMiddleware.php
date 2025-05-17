<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Models\Post;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsurePostOwnershipMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        /** @var Post $post */
        $post = $request->route('post');

        if ($post->user_id !== $request->user()->id) {
            abort(Response::HTTP_FORBIDDEN, 'This action is unauthorized.');
        }

        return $next($request);
    }
}
