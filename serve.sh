#!/bin/bash
# Надёжный запуск сервера и туннеля для "Не придешь"

PORT=8080
DIR="/root/не_придешь"

echo "=== Останавливаю старые процессы ==="
pkill -9 -f "python3 -m http.server" 2>/dev/null
pkill -9 -f "cloudflared" 2>/dev/null
fuser -k ${PORT}/tcp 2>/dev/null
sleep 2

echo "=== Запускаю HTTP сервер на порту $PORT ==="
cd "$DIR" || { echo "ОШИБКА: Папка $DIR не найдена"; exit 1; }
python3 -m http.server $PORT --bind 0.0.0.0 &
SERVER_PID=$!
sleep 3

# Проверяю что сервер работает
for i in 1 2 3; do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT/ 2>/dev/null)
    if [ "$HTTP_CODE" = "200" ]; then
        break
    fi
    echo "Попытка $i: сервер ещё не готов (код: $HTTP_CODE)..."
    sleep 2
done

if [ "$HTTP_CODE" != "200" ]; then
    echo "ОШИБКА: Сервер не отвечает после 3 попыток"
    exit 1
fi

echo "=== Сервер работает (PID: $SERVER_PID) ==="
echo ""
echo "=== Запускаю cloudflared туннель ==="
echo "Подожди несколько секунд, пока появится публичная ссылка..."
echo ""
cloudflared tunnel --url http://localhost:$PORT
