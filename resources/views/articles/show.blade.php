<x-layout variant="secondary">
    <div class="flex px-4 md:px-24 lg:px-40 py-6">
        <div class="w-32 hidden lg:block">
            <ul class="fixed z-50 flex flex-col items-center justify-center w-16 mt-40 py-6 shadow-lg rounded-full">
                <li>
                    <a href="#">
                        <svg class="w-5 h-5 text-gray"
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
                        <svg class="w-5 h-5 text-gray"
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
                    <p class="text-sm opacity-40 font-medium">
                        {{ $article->published_at->toFormattedDateString() }}
                    </p>
                </div>
            </div>

            <img
                class="w-full h-64 lg:h-96 mt-6 lg:mt-8 object-cover object-center"
                src="{{ $article->cover_url ?? '/png/article.png' }}"
                alt="{{ $article->title }}"
            />

            <div class="mt-6 lg:mt-8">
                The Tokyo 2020 Olympics is on track for a new record – having an almost equal number of female and male
                athletes for the first time, the International Committee (IOC) announced on Tuesday. The percentage of
                female athletes competing at the Olympics in Japan in July is expected to rise to nearly 49% – from 34%
                in 1996, according to a statement from the IOC. The IOC said it is committed to reaching full gender
                parity for the 2024 Paris Olympics. “It has been more of a marathon than a sprint, but female Olympians
                are at last catching their male counterparts in the numbers game,” the IOC said in a statement. The
                announcement is part of the international sports organization’s greater push for women’s rights. This
                month the IOC announced that it will have full gender representation across all 206 teams and change its
                rules to allow one male and one female athlete to jointly carry their flag during the Opening Ceremony.
                It has also taken a leadership role in the U.N. Women’s Sports For Generation Equality Initiative, which
                aims to advance gender equality in and through sports. Women’s advocacy groups applauded the IOC move.
                “When it comes to equity and inclusion in sports, the world has come a long way, but we still have a
                long way to go,” the Women’s Sports Foundation, a nonprofit focused on female involvement in sports,
                told the Thomson Reuters Foundation. “The IOC’s announcement is warranted and encouraging; it signals
                great progress toward the ultimate goal of full equality in the Olympic Games, which continues to be a
                long journey.” But news of gender equality milestones were marred by growing concerns over whether the
                Tokyo Olympics will be cancelled as world health officials advise against large gatherings in order to
                contain the coronavirus. Japan has more than 1,000 cases of the virus, resulting in 16 deaths as of
                Tuesday. Globally there are more than 100,000 confirmed cases and 3,600 deaths. Olympic organizers
                dismissed speculation that the Tokyo Summer Games could be canceled at a briefing last week. However,
                the torch lighting ceremony in ancient Olympia, Greece, will be held without spectators after organizers
                on Monday introduced tighter measures to protect against the virus.
            </div>
        </div>

        <div class="hidden lg:block w-1/3 ml-8">
            <div class="w-full px-6 py-4 shadow">
                <p class="text-sm font-medium">
                    RECENT ARTICLES
                </p>

                @if (count($recentArticles))
                    <ul class="mt-2">
                        @foreach ($recentArticles as $article)
                            <li class="mb-2">
                                <a class="text-sm opacity-90" href="{{ $article->path() }}">
                                    {{ Str::limit($article->title, 50) }}
                                </a>
                            </li>
                        @endforeach
                    </ul>
                @else
                    <p class="text-sm opacity-90">Just an empty space...</p>
                @endif
            </div>
        </div>
    </div>
</x-layout>
