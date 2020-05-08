<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <!-- Metas -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name') }}</title>

    <!-- Manifest -->
    <link rel="manifest" href="/site.webmanifest" />

    <!-- Icons -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

    <!-- Main Style -->
    <link href="{{ mix('frontend/backend/app.backend') }}" rel="stylesheet">
</head>

<body class="min-h-screen">
    <nav class="w-full bg-green-darkest">
        <div class="flex items-center w-4/5 h-24 mx-auto border-b-1/2px border-green-darker">
            <div class="w-12 h-12 mr-5 rounded-full shadow">
                <img class="w-full h-full" src="{{ asset('png/logos/indigo-circle.png') }}" alt="Hackdawg">
            </div>
            <a class="mx-5 text-sm {{ Request::path() === '/' ? 'text-blue' : 'text-gray' }}" href="{{ route('frontend.welcome') }}">
                Home
            </a>
            <a class="mx-5 text-sm text-gray" href="#">
                Portfolio
            </a>
            <a class="mx-5 text-sm text-gray" href="{{ route('frontend.articles.index') }}">
                Articles
            </a>
            <a class="mx-5 text-sm {{ Request::path() === 'about' ? 'text-blue' : 'text-gray' }}" href="{{ route('frontend.about') }}">
                About Us
            </a>
            <span class="flex-grow translate-x-full"></span>
            <x-contact>
                <button @click="open = true" class="btn btn-blue">
                    Contact Us
                </button>
            </x-contact>
        </div>
    </nav>

    <main>
        {{ $slot }}
    </main>

    <footer class="w-full bg-gray-lightest">
        <div class="w-4/5 mx-auto">
            <div class="flex flex-wrap justify-between -mx-8 pt-10 pb-20">
                <div class="px-8">
                    <div class="h-12 mb-5">
                        <img class="w-12" src="{{ asset('png/logos/black.png') }}" alt="Logo">
                    </div>
                    <p class="text-lg">
                        We can't change the world <br />
                        but we can make it more damn interesting
                    </p>
                </div>
                <div class="w-1/4 px-8">
                    <div class="h-12 mb-5">
                        <h4 class="mb-5 text-lg font-bold">Contact Us</h4>
                    </div>
                    <ul>
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
                <div class="w-1/4 px-8">
                    <div class="h-12 mb-5">
                        <h4 class="mb-5 text-lg font-bold">Social Links</h4>
                    </div>
                    <ul>
                        <li>
                            <a href="#">Github</a>
                        </li>
                        <li>
                            <a href="#">Facebook</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="py-5 border-t-1/2px border-gray">
                <p>&copy; Hackdawg {{ Carbon::now()->format('Y') }}. All rights reserved.</p>
                <p>Philippines-based innovators.</p>
            </div>
        </div>
    </footer>

    <!-- Main Script -->
    <script src="{{ mix('frontend/js/app.js') }}"></script>

    @if ($errors->count())
        <script>
            Swal.fire(
                'Whooops?!',
                '{{ $errors->first() }}',
                'error'
            );
        </script>
    @endif

    @if ($message = Session::get('message'))
        <script>
            Swal.fire(
                '{{ $message['title'] }}',
                '{{ $message['body'] }}',
                '{{ $message['type'] ?? 'info' }}'
            )
        </script>
    @endif
</body>

</html>
