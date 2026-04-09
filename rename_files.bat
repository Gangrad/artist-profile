@echo off
setlocal enabledelayedexpansion

:: --- НАСТРОЙКИ ---
set "prefix=graphics"
:: -----------------

set "PS_FILE=%temp%\renamer_script.ps1"

:: Создаем временный файл PowerShell
echo $count = 1 > "%PS_FILE%"
echo Get-ChildItem -File ^| Where-Object { $_.Name -ne '%~nx0' } ^| Sort-Object CreationTime ^| ForEach-Object { >> "%PS_FILE%"
echo     $ext = $_.Extension >> "%PS_FILE%"
echo     $newName = '%prefix%_{0:D3}{1}' -f $count, $ext >> "%PS_FILE%"
echo     Write-Host "Renaming: $($_.Name) -> $newName" >> "%PS_FILE%"
echo     Rename-Item -Path $_.FullName -NewName $newName >> "%PS_FILE%"
echo     $count++ >> "%PS_FILE%"
echo } >> "%PS_FILE%"

:: Запускаем его
powershell -NoProfile -ExecutionPolicy Bypass -File "%PS_FILE%"

:: Удаляем временный файл
del "%PS_FILE%"

echo.
echo Done!
pause