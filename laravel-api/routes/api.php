<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\EnsureCommentOwnershipMiddleware;
use App\Http\Middleware\EnsurePostOwnershipMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'getAuthUser']);
    Route::patch('/user', [UserController::class, 'updateAuthUser']);
    Route::patch('/user/password', [UserController::class, 'updateAuthUserPassword']);

    Route::get('/user/posts', [PostController::class, 'authUserPosts']);
    Route::get('/user/posts/{post}', [PostController::class, 'showWithCategories'])->middleware(EnsurePostOwnershipMiddleware::class);

    Route::post('/logout', LogoutController::class);

    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::get('/users/{user}/posts', [PostController::class, 'userPosts']);

    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/search', [PostController::class, 'search']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::get('/posts/{post}', [PostController::class, 'showFull']);

    Route::middleware(EnsurePostOwnershipMiddleware::class)->group(function () {
        Route::patch('/posts/{post}', [PostController::class, 'update']);
        Route::delete('/posts/{post}', [PostController::class, 'destroy']);
    });

    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{category:slug}', [CategoryController::class, 'show']);
    Route::get('/categories/{category}/posts', [CategoryController::class, 'posts']);

    Route::post('/posts/{post}/comments', [CommentController::class, 'store']);
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->middleware(EnsureCommentOwnershipMiddleware::class);
});

Route::middleware('guest')->group(function () {
    Route::post('/login', LoginController::class);
    Route::post('/register', RegisterController::class);
});
