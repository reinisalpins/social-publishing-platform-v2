<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $categories = Category::all();

        Post::factory(50)->make()->each(function ($post) use ($users, $categories) {
            $post->user_id = $users->random()->id;
            $post->save();

            $post->categories()->attach(
                $categories->random(rand(1, 4))->pluck('id')->toArray()
            );
        });
    }
}
