SET QT_QPA_PLATFORM_PLUGIN_PATH=C:\KinoSSBT\HALMiddleware
SET QML_IMPORT_PATH=C:\KinoSSBT\HALMiddleware
SET QML2_IMPORT_PATH=C:\KinoSSBT\HALMiddleware

SET PATH=C:\KinoSSBT\HALMiddleware;C:\HAL\EXE64;%PATH%
cd C:\KinoSSBT\HALMiddleware
START "HAL_MID" /B /D C:\KinoSSBT\HALMiddleware "HALMiddleware.exe" 8889
timeout /t 2 /nobreak > NUL
cd C:\KinoSSBT
START "OPAP_LOTTERY" /B /D C:\KinoSSBT opap-lottery-games.exe