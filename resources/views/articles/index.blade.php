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
                    @include('articles.article')
                @empty
                    <p class="h-64 p-4">
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

            @if (count($articles))
                <div class="hidden md:block px-6">
                    <p class="opacity-40 font-medium">
                        Authors
                    </p>

                    <ul class="mt-4">
                        @foreach ($authors as $author)
                            <li class="flex items-center mb-4">
                                <a href="{{ route('articles.index', ['tag' => request('tag'), 'author' => $author->id]) }}">
                                    <x-avatar url="{{ $author->avatar_url }}"></x-avatar>
                                </a>

                                <p class="ml-4 opacity-60">
                                    {{ $author->name }}
                                </p>
                            </li>
                        @endforeach
                    </ul>
                </div>
            @endif
        </div>
    </div>
</x-layout>
