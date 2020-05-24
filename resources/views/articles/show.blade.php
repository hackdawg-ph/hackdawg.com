<x-layout variant="secondary">
    <div class="flex px-4 sm:px-8 md:px-24 xl:px-32 py-6">
        <div class="w-32 hidden md:block">
            <ul class="fixed z-50 bg-white flex flex-col items-center justify-center w-16 mt-40 py-6 shadow-lg rounded-full">
                <li>
                    <a href="#">
                        <svg class="w-5 h-5 text-gray-500"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             stroke="currentColor"
                             stroke-width="1.5"
                             viewBox="0 0 12.5 21.5">
                            <path d="M18,2H15a5,5,0,0,0-5,5v3H7v4h3v8h4V14h3l1-4H14V7a1,1,0,0,1,1-1h3Z"
                                  transform="translate(-6.25 -1.25)"/>
                        </svg>
                    </a>
                </li>
                <li class="mt-6">
                    <a href="#">
                        <svg class="w-5 h-5 text-gray-500"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             stroke="currentColor"
                             stroke-width="1.5"
                             viewBox="0 0 23.5 19.636">
                            <path
                                d="M23,3a10.9,10.9,0,0,1-3.14,1.53,4.48,4.48,0,0,0-7.86,3v1A10.66,10.66,0,0,1,3,4s-4,9,5,13a11.64,11.64,0,0,1-7,2c9,5,20,0,20-11.5a4.5,4.5,0,0,0-.08-.83A7.72,7.72,0,0,0,23,3Z"
                                transform="translate(-0.25 -2.166)"/>
                        </svg>
                    </a>
                </li>
            </ul>
        </div>

        <div class="w-full">
            <h1 class="text-lg md:text-2xl font-medium">
                {{ $article->title }}
            </h1>

            <div class="flex mt-6 lg:mt-8">
                <x-avatar url="{{ $article->author->avatar_url }}" size="lg"></x-avatar>

                <div class="ml-3">
                    <p class="text-sm font-medium">
                        {{ $article->author->name }}
                    </p>
                    <p class="text-sm opacity-50 font-medium">
                        {{ $article->published_at->toFormattedDateString() }}
                    </p>
                </div>
            </div>

            <img
                class="w-full h-64 sm:h-72 xl:h-96 mt-6 lg:mt-8 object-cover object-center"
                src="{{ $article->cover_url ?? '/png/article.png' }}"
                alt="{{ $article->title }}"
            />

            <div class="slate mt-6 lg:mt-8">
                {!! Slate::serialize(json_decode($article->body)) !!}
            </div>
        </div>

        <div class="hidden lg:block md:w-2/5 xl:w-1/3 ml-8">
            <div class="w-full min-h-72 px-6 py-4 shadow">
                <p class="text-sm font-medium">
                    RECENT ARTICLES
                </p>

                @if (count($recentArticles))
                    <ul class="mt-2">
                        @foreach ($recentArticles as $article)
                            <li class="mb-2">
                                <a class="text-sm text-gray-700" href="{{ $article->path() }}">
                                    {{ Str::limit($article->title, 50) }}
                                </a>
                            </li>
                        @endforeach
                    </ul>
                @else
                    <p class="text-sm text-gray-700">Just an empty space...</p>
                @endif
            </div>
        </div>
    </div>
</x-layout>
