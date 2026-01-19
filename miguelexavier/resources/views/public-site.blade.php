<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
