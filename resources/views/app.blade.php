<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="Template project to start working with Laravel and Vite">
  <link rel="alternate icon" href="/favicon.ico" type="image/png" sizes="16x16">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
  <meta name="theme-color" content="#ffddff">
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <link rel="preconnect" crossorigin="anonymous" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700&display=swap" rel="stylesheet">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="{{ vite_asset('/favicon-32x32.png') }}">
  <link rel="icon" type="image/png" sizes="16x16" href="{{ vite_asset('/favicon-16x16.png') }}">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#875bd5">
  <meta name="msapplication-TileColor" content="#da532c">
  <title>Laravel Vite Template</title>
  @vite
</head>
<body class="antialiased">
  <div id="app"></div>
</body>
</html>
