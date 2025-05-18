<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\AuthenticatedUserController;
use App\Http\Controllers\AuthenticatedUserPostController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CategoryPostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UpdatePasswordController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserPostController;
use App\Http\Middleware\EnsureCommentOwnershipMiddleware;
use App\Http\Middleware\EnsurePostOwnershipMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    /**
     * User routes
     */
    Route::post('/logout', LogoutController::class);
    Route::get('/user', [AuthenticatedUserController::class, 'show']);
    Route::patch('/user', [AuthenticatedUserController::class, 'update']);
    Route::patch('/user/password', UpdatePasswordController::class);

//    Route::get('/users/{user}', [UserController::class, 'show']);
//    Route::get('/users/{user}/posts', [UserPostController::class, 'index']);

    /**
     * Posts routes
     */
    Route::get('/user/posts', [AuthenticatedUserPostController::class, 'index']);
    Route::middleware(EnsurePostOwnershipMiddleware::class)->group(function () {
        Route::get('/user/posts/{post}', [AuthenticatedUserPostController::class, 'show']);
        Route::patch('/posts/{post}', [PostController::class, 'update']);
        Route::delete('/posts/{post}', [PostController::class, 'destroy']);
    });
    Route::post('/posts', [PostController::class, 'store']);
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{post}', [PostController::class, 'show']);
    Route::post('/posts/{post}/comments', [CommentController::class, 'store']);

    /**
     * Categories routes
     */
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{category:slug}', [CategoryController::class, 'show']);
    Route::get('/categories/{category}/posts', [CategoryPostController::class, 'index']);;

    /**
     * Comments routes
     */
    Route::middleware(EnsureCommentOwnershipMiddleware::class)->group(function () {
        Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);
    });
});

Route::middleware('guest')->group(function () {
    /**
     * Auth routes
     */
    Route::post('/login', LoginController::class);
    Route::post('/register', RegisterController::class);
});
