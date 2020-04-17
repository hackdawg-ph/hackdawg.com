<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name') }}</title>

        <link href="{{ mix('console/css/app.css') }}" rel="stylesheet">
        <script src="{{ mix('console/js/app.js') }}" defer></script>
        @routes
    </head>

    <body>
        @inertia
    </body>
</html>