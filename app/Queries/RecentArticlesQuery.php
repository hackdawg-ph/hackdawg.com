<?php


namespace App\Queries;

use App\Models\Article;

class RecentArticlesQuery
{
    /**
     * Run the query
     *
     * @param  array<int> $blacklistedArticles
     * @return \Illuminate\Support\Collection
     */
    public static function run($blacklistedArticles)
    {
        return Article::latest()
            ->whereNotIn('id', $blacklistedArticles)
            ->take(5)
            ->get();
    }
}
