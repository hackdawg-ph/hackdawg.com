<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Article extends Model implements HasMedia
{
    use HasSlug;
    use InteractsWithMedia;

    /**
     * The relations to eager load on every query.
     *
     * @var array<string>
     */
    protected $with = [
        'tags',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<string>
     */
    protected $appends = [
        'cover_url', 'published_since',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'user_id', 'title', 'slug', 'body', 'published_at',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, mixed>
     */
    protected $casts = [
        'published_at' => 'datetime',
    ];

    /**
     * Get the converted cover media url.
     *
     * @return string|null
     */
    public function getCoverUrlAttribute()
    {
        return optional($this->getMedia('covers')->last())->getUrl('thumb');
    }

    /**
     * The published date formatted since the current moment.
     *
     * @return string|null
     * @throws \Exception
     */
    public function getPublishedSinceAttribute()
    {
        return $this->published_at ? Carbon::parse($this->published_at)->diffForHumans() : null;
    }

    /**
     * Get the path to show the article.
     *
     * @return string
     */
    public function path()
    {
        return route('articles.show', $this);
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class)->withTimestamps();
    }

    /**
     * Get the options for generating the slug.
     *
     * @return \Spatie\Sluggable\SlugOptions
     */
    public function getSlugOptions()
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function registerAllMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(1024)
            ->height(768)
            ->sharpen(10);
    }
}
