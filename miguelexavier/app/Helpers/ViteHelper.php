<?php

if (!function_exists('vite_asset')) {
    /**
     * Retorna o caminho do asset do Vite a partir do manifest.json
     *
     * @param string $entry Nome do arquivo de entrada (ex: 'main.jsx')
     * @param string $type Tipo de asset: 'admin' ou 'site'
     * @return array|null
     */
    function vite_asset($entry, $type = 'admin')
    {
        $manifestPath = $type === 'admin' 
            ? 'admin-assets/.vite/manifest.json'
            : 'site-assets/.vite/manifest.json';
            
        $manifestFullPath = public_path($manifestPath);
        
        if (!file_exists($manifestFullPath)) {
            return null;
        }

        $manifest = json_decode(file_get_contents($manifestFullPath), true);

        if (!isset($manifest[$entry])) {
            return null;
        }

        return $manifest[$entry];
    }
}

if (!function_exists('vite_js')) {
    /**
     * Retorna o caminho do arquivo JS do Vite
     *
     * @param string $entry Nome do arquivo de entrada (ex: 'main.jsx')
     * @param string $type Tipo de asset: 'admin' ou 'site'
     * @return string|null
     */
    function vite_js($entry, $type = 'admin')
    {
        $asset = vite_asset($entry, $type);
        $baseUrl = $type === 'admin' ? '/admin-assets/' : '/site-assets/';
        
        if (!$asset || !isset($asset['file'])) {
            return null;
        }

        return $baseUrl . $asset['file'];
    }
}

if (!function_exists('vite_css')) {
    /**
     * Retorna o caminho do arquivo CSS do Vite
     *
     * @param string $entry Nome do arquivo de entrada (ex: 'main.jsx')
     * @param string $type Tipo de asset: 'admin' ou 'site'
     * @return string|null
     */
    function vite_css($entry, $type = 'admin')
    {
        $asset = vite_asset($entry, $type);
        $baseUrl = $type === 'admin' ? '/admin-assets/' : '/site-assets/';
        
        if (!$asset || !isset($asset['css']) || empty($asset['css'])) {
            return null;
        }

        return $baseUrl . $asset['css'][0];
    }
}
