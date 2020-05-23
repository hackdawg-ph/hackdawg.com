<div class="flex w-full md:w-1/2 xl:w-1/3 p-4 md:py-6">
    <div class="w-full shadow-sm hover:shadow-lg">
        <img
            class="w-full h-64 sm:h-72 md:h-48 xl:h-40 object-cover object-center"
            src="{{ $article->cover_url ?? '/png/article.png' }}"
            alt="{{ $article->title }}"
        >

        <div class="p-3 md:p-5">
            <h1 class="font-medium leading-relaxed">
                {{ Str::limit($article->title, 40) }}
            </h1>

            <div class="flex items-center mt-2">
                <x-avatar url="{{ $article->author->avatar_url }}" size="lg"></x-avatar>

                <div class="flex flex-wrap items-end flex-1 ml-4">
                    <div>
                        <p class="text-sm font-medium">
                            {{ $article->author->name }}
                        </p>
                        <p class="text-sm text-gray-600 font-medium">
                            {{ $article->published_at->toFormattedDateString() }}
                        </p>
                    </div>
                    <div class="ml-auto">
                        <a class="text-sm text-gray-600 font-medium" href="{{ $article->path() }}">
                            Read more...
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
