<x-layout variant="secondary">
    <div class="bg-green-darkest">
        <div class="px-4 md:px-24 lg:px-40 py-8 md:py-16 lg:py-32">
            <h1 class="text-white text-2xl lg:text-5xl font-semibold leading-loose">
                Welcome to Our Blog
            </h1>
            <p class="w-3/4 lg:w-1/2 text-sm md:text-base text-gray">
                Stay updated with the newest design and development stories, case studies, and insights shared by
                Hackdawg Team.
            </p>
        </div>
    </div>

    <div class="px-4 md:px-24 lg:px-40">
        @if (count($tags))
            <ul class="hidden md:flex py-8">
                @foreach($tags as $tag)
                    <li class="mr-12">
                        <a
                            class="font-medium {{ request('tag') === $tag->name ? '' : 'opacity-60' }}"
                            href="{{ route('articles.index', ['tag' => $tag->name]) }}"
                        >
                            {{ Str::ucfirst($tag->name) }}
                        </a>
                    </li>
                @endforeach
            </ul>
        @endif

        <div class="flex flex-wrap mx-0 md:-mx-6 mt-6">
            <div class="flex flex-wrap lg:w-4/5 -mx-4 -mt-4 md:-mt-6 md:px-6">
                @forelse($articles as $article)
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
                @empty
                    <p class="p-4">
                        <span class="opacity-60">
                            Nothing yet, just an empty space...
                        </span>
                        @if (request(['tag', 'author', 'page']))
                            <a class="text-blue" href="{{ route('articles.index') }}">Remove filters?</a>
                        @endif
                    </p>
                @endforelse

                @if ($articles->hasPages())
                    <div class="flex justify-between w-full px-4 pb-6">
                        @if ($articles->currentPage() > 1)
                            <a class="btn btn-blue" href="{{ $articles->previousPageUrl() }}">
                                Newer
                            </a>
                        @endif

                        <div></div>

                        @if ($articles->hasMorePages())
                            <a class="btn btn-blue" href="{{ $articles->nextPageUrl() }}">
                                Older
                            </a>
                        @endif
                    </div>
                @endif
            </div>
            <div class="hidden md:block px-6">
                <p class="opacity-40 font-medium">
                    Authors
                </p>

                <ul class="mt-4">
                    @foreach ($authors as $author)
                        <li class="flex items-center mb-4">
                            <a href="{{ route('articles.index', ['tag' => request('tag'), 'author' => $author->id]) }}">
                                <div class="w-10 h-10 overflow-hidden rounded-full bg-gray-lightest">
                                    @if ($avatarUrl = $author->avatar_url)
                                        <img class="w-full h-full object-cover object-center" src="{{ $avatarUrl }}" alt="" />
                                    @else
                                        <svg class="w-full h-full text-gray" fill="currentColor"
                                             viewBox="0 0 24 24">
                                            <path
                                                d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                        </svg>
                                    @endif
                                </div>
                            </a>

                            <p class="ml-4 opacity-60">
                                {{ $author->name }}
                            </p>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
</x-layout>
