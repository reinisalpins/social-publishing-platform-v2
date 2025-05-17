<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Models\Comment;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureCommentOwnershipMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        /** @var Comment $comment */
        $comment = $request->route('comment');

        if ($comment->user_id !== $request->user()->id) {
            abort(Response::HTTP_FORBIDDEN, 'This action is unauthorized.');
        }

        return $next($request);
    }
}
