<?php

namespace App\Queries;

use Illuminate\Support\Facades\DB;

class ArticleArchivesQuery
{
    /**
     * Run the query
     *
     * @return \Illuminate\Support\Collection
     */
    public static function run()
    {
        return DB::table('articles')
            ->whereNotNull('published_at')
            ->selectRaw('YEAR(published_at) year, MONTHNAME(published_at) month, count(*) as published')
            ->groupBy('year', 'month')
            ->orderByRaw('MIN(published_at) DESC')
            ->get();
    }
}
