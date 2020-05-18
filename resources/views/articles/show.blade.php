<x-layout variant="secondary">
    <div class="flex px-4 py-5 bg-gray-lightest">
        <div class="w-full">
            <h1 class="text-lg font-medium">
                {{ $article->title }}
            </h1>

            <div class="flex mt-6">
                <x-avatar url="{{ $article->author->avatar_url }}" size="lg"></x-avatar>

                <div class="ml-3">
                    <p class="text-sm font-medium">
                        {{ $article->author->name }}
                    </p>
                    <p class="text-sm opacity-40 font-medium">
                        {{ $article->published_at->toFormattedDateString() }}
                    </p>
                </div>
            </div>

            <img
                class="w-full h-auto mt-6 object-cover object-center"
                src="/png/article.png"
                alt="{{ $article->title }}"
            />
        </div>
        <div class="hidden md:block">
            <p class="text-sm font-medium">
                RECENT ARTICLES
            </p>
        </div>
    </div>
</x-layout>
