<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Post extends Model
{
    protected $fillable = ['user_id', 'title', 'content'];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, CategoryPost::class);
    }
}
