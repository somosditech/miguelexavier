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
    <meta name="description" content="Escritório de advocacia especializado em Direito Civil e Previdenciário. Atendimento online com sigilo absoluto.">

    <!-- Open Graph / WhatsApp / redes sociais -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://miguelexavier.adv.br/">
    <meta property="og:title" content="Miguel & Xavier Advocacia">
    <meta property="og:description" content="Advocacia especializada para proteger seus direitos. Atendimento online com sigilo absoluto.">
    <meta property="og:image" content="https://miguelexavier.adv.br/apple-touch-icon.png">
    <meta property="og:image:width" content="180">
    <meta property="og:image:height" content="180">
    <meta property="og:locale" content="pt_BR">
    <meta name="twitter:card" content="summary_large_image">

    <!-- Preload Critical Fonts -->
    <link rel="preload" href="/fonts/Trajan.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/fonts/Montserrat-Regular.ttf" as="font" type="font/ttf" crossorigin>
    
    @if($cssPath = vite_css('main.jsx', 'site'))
        <link rel="preload" href="{{ $cssPath }}" as="style">
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
