<?php

namespace App\Queries;

use App\Models\User;

class TopAuthorsQuery
{
    /**
     * Run the query
     *
     * @return \Illuminate\Support\Collection
     */
    public static function run()
    {
        return User::with('media')
            ->join('articles', 'users.id', '=', 'articles.user_id')
            ->whereNotNull('articles.user_id')
            ->selectRaw('users.*, count(*) as writings')
            ->groupBy('users.id')
            ->orderByDesc('writings')
            ->limit(5)
            ->get();
    }
}
