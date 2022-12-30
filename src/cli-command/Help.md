### Команда `GenerateCommand` 

# ожидает несколько аргументов:
* `<count>` — обязательный. Количество объявлений для генерации.
* `<filepath>` — обязательный. Путь к файлу для записи результата.
* `<url>` — обязательный. URL сервиса (JSON-server).

# Вызов команды должен выглядеть так:
```
$: ./cli.js --generate 10 ./mocks/mock-offers.tsv http://localhost:3123/api
```