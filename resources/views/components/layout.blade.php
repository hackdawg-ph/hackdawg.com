<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name') }}</title>

    <!-- Manifest -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />

    <!-- Main Style -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>

<body class="min-h-screen">
    <main>
        {{ $slot }}
    </main>

    <!-- Main Script -->
    <script src="{{ mix('js/app.js') }}"></script>
</body>

</html>