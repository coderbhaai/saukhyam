<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="base-url" content="{{ url('/') }}">
    <base href="/">
    <meta property="og:image" content="https://saukhyampads.com/images/static/banana.png"/>
    <meta property="og:url" content="https://saukhyampads.com/"/>
    <meta property="og:title" content="Saukhyam Pads"/>
    <meta property="og:description" content="Saukhyam Pads"/>
    <meta property="og:locale" content="en_US"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="Saukhyam Pads"/>
    <meta property="article:modified_time" content="2021-08-23T17:49:25+00:00"/>
    <meta property="fb:app_id" content="154761472308630"/>













    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Saukhyam App</title>
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link href="{{ asset('/css/font-awesome.css') }}" rel="stylesheet">
    <link href="{{ asset('/css/bootstrap.css') }}" rel="stylesheet">
    <link href="{{ asset('/css/style.css') }}" rel="stylesheet">
</head>
<body>
    <div id="root"></div>
    <script src="{{asset('/js/jquery-3.5.1.min.js')}}"></script>
    <script src="{{asset('/js/app.js')}}"></script>
    <script src="{{asset('/js/extra.js')}}"></script>
</body>
</html>
