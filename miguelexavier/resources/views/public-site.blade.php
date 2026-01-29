<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Favicons -->
    <link rel="icon" type="image/png" href="/favicon-96x96.png?v=2" sizes="96x96" />
    <link rel="shortcut icon" href="/favicon.ico?v=2" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
    <meta name="apple-mobile-web-app-title" content="M&X" />
    <link rel="manifest" href="/site.webmanifest?v=2" />
    
    <title>Miguel & Xavier Advocacia</title>
    @if($cssPath = vite_css('main.jsx', 'site'))
        <link rel="stylesheet" href="{{ $cssPath }}">
    @endif
</head>
<body>
    <div id="root"></div>
    @if($jsPath = vite_js('main.jsx', 'site'))
        <script type="module" src="{{ $jsPath }}"></script>
    @endif
</body>
</html>
