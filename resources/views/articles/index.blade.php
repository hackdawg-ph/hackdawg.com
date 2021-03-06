<x-layout variant="secondary">
    <div class="bg-green-darkest">
        <div class="p-4 sm:px-8 sm:py-16 md:px-24 md:py-32 xl:px-40 xl:py-48">
            <h1 class="text-white text-2xl lg:text-5xl xl:text-6xl font-semibold leading-loose">
                Welcome to Our Blog
            </h1>
            <p class="lg:w-2/3 xl:w-1/3 text-sm md:text-base text-gray-400">
                Stay updated with the newest design and development stories,
                case studies, and insights shared by the Hackdawg Team.
            </p>
        </div>
    </div>

    <div class="px-4 sm:px-8 md:px-24 xl:px-40">
        @if (count($tags))
            <ul class="hidden md:flex py-8">
                @foreach($tags as $tag)
                    <li class="mr-12 xl:mr-20">
                        <a
                            class="font-medium {{ request('tag') === $tag->name ? '' : 'text-gray-600' }}"
                            href="{{ route('articles.index', ['tag' => $tag->name]) }}"
                        >
                            {{ Str::ucfirst($tag->name) }}
                        </a>
                    </li>
                @endforeach
            </ul>
        @endif

        <div class="flex flex-wrap sm:my-4">
            <div class="flex flex-wrap w-full md:w-3/4 xl:w-4/5 md:-mx-4 md:-my-6">
                @forelse($articles as $article)
                    @include('articles.article')
                @empty
                    <p class="h-64 p-4">
                        <span class="text-gray-500">
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
                <div class="hidden md:block md:w-1/4 xl:w-1/5 ml-8">
                    <div class="w-full min-h-72 px-6 py-4 shadow">
                        <p class="text-sm font-medium">
                            ARCHIVES
                        </p>

                        <ul class="mt-4">
                            @foreach ($archives as $stats)
                                <li class="flex items-center mb-4">
                                    <a class="text-sm" href="{{ route('articles.index', ['month' => $stats->month, 'year' => $stats->year]) }}">
                                        {{ $stats->month . ' ' . $stats->year }}
                                    </a>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            @endif
        </div>
    </div>
</x-layout>
