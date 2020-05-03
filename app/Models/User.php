<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements HasMedia
{
    use Notifiable, SoftDeletes, InteractsWithMedia, HasRoles;

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'name',
        'avatar_url',
        'role_name',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'job_title',
        'company',
        'website',
        'about',
        'first_name',
        'middlename',
        'last_name',
        'email',
        'birthdate',
        'gender',
        'country',
        'state',
        'city',
        'street_address',
        'postal_code',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the user's full name
     *
     * @return string
     */
    public function getNameAttribute()
    {
        return "{$this->first_name} {$this->middle_name} {$this->last_name}";
    }

    /**
     * Get the converted avatar media url.
     *
     * @return string|null
     */
    public function getAvatarUrlAttribute()
    {
        return optional($this->getMedia('avatars')->last())->getUrl('thumb');
    }

    /**
     * Get the converted avatar media url.
     *
     * @return string|null
     */
    public function getRoleNameAttribute()
    {
        return Str::ucfirst(optional($this->roles()->first())->name);
    }

    /**
     * Get the articles for the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    /**
     * Create an associated article.
     *
     * @param array $attributes
     *
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function createArticle($attributes)
    {
        return $this->articles()->create($attributes);
    }

    public function registerAllMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(240)
            ->height(240)
            ->sharpen(10);
    }
}
