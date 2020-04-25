<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
    
        <title>{{ config('app.name') }}</title>

        <!-- Scripts -->
        <script src="{{ mix('backend/js/app.js') }}" defer></script>
        @routes

        <!-- Fonts -->
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css">

        <!-- Styles -->
        <link href="{{ mix('backend/css/app.css') }}" rel="stylesheet">
    </head>

    <body>
        @inertia

        <!-- React Portals -->
        <div id="notification-portal"></div>
        <div id="modal-portal"></div>
    </body>
</html>