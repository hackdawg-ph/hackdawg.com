<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" xmlns:livewire="http://www.w3.org/1999/html">

<head>
    <!-- Metas -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name') }}</title>

    <!-- Manifest -->
    <link rel="manifest" href="/site.webmanifest"/>

    <!-- Icons -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>

    <livewire:styles/>

    <!-- Main Style -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>

<body class="antialiased text-gray-900">

<div class="min-h-screen overflow-x-hidden">
    <div
        class="h-full flex overflow-hidden bg-white"
        x-data="{ sidebarOpen: false }"
        @keydown.window.escape="sidebarOpen = false"
    >
        <!-- Off-canvas menu for mobile -->
        <div class="md:hidden" x-show="sidebarOpen">
            <div class="fixed inset-0 flex z-40">
                <div
                    class="fixed inset-0"
                    @click="sidebarOpen = false"
                    x-show="sidebarOpen"
                    x-description="Off-canvas menu overlay, show/hide based on off-canvas menu state."
                    x-transition:enter="transition-opacity ease-linear duration-300"
                    x-transition:enter-start="opacity-0"
                    x-transition:enter-end="opacity-100"
                    x-transition:leave="transition-opacity ease-linear duration-300"
                    x-transition:leave-start="opacity-100"
                    x-transition:leave-end="opacity-0"
                >
                    <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
                </div>
                <div
                    class="relative flex-1 flex flex-col max-w-xs w-full bg-white"
                    x-show="sidebarOpen"
                    x-description="Off-canvas menu, show/hide based on off-canvas menu state."
                    x-transition:enter="transition ease-in-out duration-300 transform"
                    x-transition:enter-start="-translate-x-full"
                    x-transition:enter-end="translate-x-0"
                    x-transition:leave="transition ease-in-out duration-300 transform"
                    x-transition:leave-start="translate-x-0"
                    x-transition:leave-end="-translate-x-full"
                >
                    <div class="absolute top-0 right-0 -mr-16 p-1">
                        <button
                            class="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                            @click="sidebarOpen = false"
                            aria-label="Close sidebar"
                        >
                            <svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div class="flex-shrink-0 flex items-center px-4">
                            <a href="{{ route('welcome') }}">
                                <img class="w-12 h-12" src="{{ asset('png/logos/indigo.png') }}" alt="Hackdawg">
                            </a>
                        </div>
                        <nav class="mt-5 px-2">
                            <!-- Nav Links -->
                        </nav>
                    </div>
                </div>
                <div class="flex-shrink-0 w-12">
                    <!-- Force sidebar to shrink to fit close icon -->
                </div>
            </div>
        </div>

        <div class="flex flex-col w-0 flex-1 overflow-hidden">
            <div class="md:hidden w-full shadow-sm {{ $variant === 'secondary' ? 'bg-white' : 'bg-green-darkest' }}">
                <div class="flex items-center justify-between px-4 sm:px-8 h-24">
                    <button
                        class="h-12 w-12 -ml-3 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                        @click="sidebarOpen = true"
                        aria-label="Open sidebar"
                    >
                        <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/>
                        </svg>
                    </button>

                    <a href="{{ route('welcome') }}">
                        <img class="w-12 h-12" src="{{ asset('png/logos/indigo.png') }}" alt="Hackdawg">
                    </a>

                    <div class="w-12"></div>
                </div>
            </div>
            <div class="hidden md:block shadow-sm {{ $variant === 'secondary' ? 'bg-white' : 'bg-green-darkest' }}">
                <div class="flex items-center px-4 md:px-24 xl:px-32 h-24">
                    <a href="{{ route('welcome') }}">
                        <img class="w-12 h-12 mr-5 rounded-full" src="{{ asset('png/logos/indigo-circle.png') }}" alt="Hackdawg">
                    </a>
                    <a class="mx-5 text-sm {{ Request::path() === '/' ? 'text-blue' : ($variant === 'secondary' ? 'text-gray-600' : 'text-gray-400') }}" href="{{ route('welcome') }}">
                        Home
                    </a>
                    <a class="mx-5 text-sm {{ Request::path() === 'portfolio' ? 'text-blue' : ($variant === 'secondary' ? 'text-gray-600' : 'text-gray-400') }}" href="#">
                        Portfolio
                    </a>
                    <a class="mx-5 text-sm {{ Request::path() === 'articles' ? 'text-blue' : ($variant === 'secondary' ? 'text-gray-600' : 'text-gray-400') }}" href="{{ route('articles.index') }}">
                        Articles
                    </a>
                    <a class="mx-5 text-sm {{ Request::path() === 'about' ? 'text-blue' : ($variant === 'secondary' ? 'text-gray-600' : 'text-gray-400') }}" href="{{ route('about') }}">
                        About Us
                    </a>
                    <div class="flex-grow translate-x-full"></div>
                    <livewire:contact-form />
                </div>
            </div>
            <main class="flex-1 relative z-0 overflow-y-auto pb-6 focus:outline-none" tabindex="0">
                {{ $slot }}
            </main>
        </div>
    </div>

    <footer class="w-full bg-gray-lightest">
        <div class="px-4 sm:px-8 md:px-24 xl:px-32">
            <div class="flex flex-wrap justify-between -mx-8 lg:mx-0 py-10 md:pb-20">
                <div class="w-full md:w-1/3 px-8 md:px-0">
                    <img class="w-12 h-12" src="{{ asset('png/logos/black.png') }}" alt="Logo">
                    <p class="mt-1 md:mt-5 text-lg">
                        We can't change the world but we can make it more damn interesting
                    </p>
                </div>
                <div class="w-full md:w-1/4 mt-4 md:mt-0 px-8">
                    <h4 class="md:h-12 text-lg font-bold">Contact Us</h4>
                    <ul class="mt-1 md:mt-5">
                        <li>
                            <a href="mailto://hello@hackdawg.com">hello@hackdawg.com</a>
                        </li>
                        <li>
                            <a href="#">+63947 107 85 92</a>
                        </li>
                        <li>
                            <a href="#">+63917 610 3841</a>
                        </li>
                    </ul>
                </div>
                <div class="w-full md:w-1/4 mt-4 md:mt-0 px-8">
                    <h4 class="md:h-12 text-lg font-bold">Social Links</h4>
                    <ul class="mt-1 md:mt-5">
                        <li>
                            <a href="#">Github</a>
                        </li>
                        <li>
                            <a href="#">Facebook</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="py-3 md:py-5 border-t-1/2px border-gray">
                <p>&copy Hackdawg {{ Carbon::now()->format('Y') }}. All rights reserved.</p>
                <p>Philippines-based innovators.</p>
            </div>
        </div>
    </footer>
</div>

<livewire:scripts/>

<!-- Main Script -->
<script src="{{ mix('js/app.js') }}"></script>

</body>

</html>
