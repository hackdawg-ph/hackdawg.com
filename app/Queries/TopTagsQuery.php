<?php

namespace App\Queries;

use Illuminate\Support\Facades\DB;

class TopTagsQuery
{
    /**
     * Run the query
     *
     * @return \Illuminate\Support\Collection
     */
    public static function run()
    {
        return DB::table('article_tag')
            ->join('tags', 'article_tag.tag_id', '=', 'tags.id')
            ->selectRaw('tags.id, tags.name, count(*) as attachments')
            ->groupBy('tags.id')
            ->orderByDesc('attachments')
            ->limit(5)
            ->get();
    }
}
