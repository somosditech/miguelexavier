@echo off
echo ========================================
echo   Build do Front-end para Producao
echo ========================================
echo.

cd front

echo [1/3] Instalando dependencias...
call npm install
if errorlevel 1 (
    echo ERRO: Falha ao instalar dependencias
    pause
    exit /b 1
)

echo.
echo [2/3] Criando build de producao...
call npm run build
if errorlevel 1 (
    echo ERRO: Falha ao criar build
    pause
    exit /b 1
)

echo.
echo [3/3] Copiando .htaccess para dist...
copy .htaccess dist\.htaccess

echo.
echo ========================================
echo   BUILD CONCLUIDO COM SUCESSO!
echo ========================================
echo.
echo Arquivos prontos em: front\dist\
echo.
echo Proximo passo:
echo 1. Abra o FileZilla
echo 2. Conecte ao servidor FTP
echo 3. Envie o conteudo de front\dist\ para public_html\
echo.
pause
