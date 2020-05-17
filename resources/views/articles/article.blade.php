<div class="flex w-full md:w-1/2 p-4 md:py-6">
    <div class="w-full shadow-sm hover:shadow-lg">
        <img class="w-full h-48 md:h-56 lg:h-64 object-cover object-center" src="/png/article.png" alt="{{ $article->title }}">

        <div class="p-3 md:p-5">
            <h1 class="font-medium leading-relaxed">
                {{ Str::limit($article->title, 40) }}
            </h1>

            <div class="flex items-center mt-2">
                <div class="w-12 h-12 overflow-hidden rounded-full bg-gray-lightest">
                    @if ($avatarUrl = $article->author->avatar_url)
                        <img class="w-full h-full object-cover object-center" src="{{ $avatarUrl }}" alt="">
                    @else
                        <svg class="w-full h-full text-gray" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
                        </svg>
                    @endif
                </div>
                <div class="flex flex-wrap items-end flex-1 ml-4">
                    <div>
                        <p class="text-sm font-medium">
                            {{ $article->author->name }}
                        </p>
                        <p class="text-sm opacity-40 font-medium">
                            {{ $article->published_at->toFormattedDateString() }}
                        </p>
                    </div>
                    <div class="ml-auto">
                        <a class="text-sm opacity-40 font-medium" href="{{ $article->path() }}">
                            Read more...
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
