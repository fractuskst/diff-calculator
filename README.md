# Проект "Вычислитель отличий":
[![Actions Status](https://github.com/fractuskst/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/fractuskst/frontend-project-46/actions)
[![Actions Status](https://github.com/fractuskst/frontend-project-46/actions/workflows/node.js.yml/badge.svg)](https://github.com/fractuskst/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/30aaf0019a10a30353b0/maintainability)](https://codeclimate.com/github/fractuskst/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/30aaf0019a10a30353b0/test_coverage)](https://codeclimate.com/github/fractuskst/frontend-project-46/test_coverage)

## Описание проекта
__"Вычислитель отличий"__ – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

### Установка

```
npm ci
```
```
npm link
```

### Описание работы программы:
Диф строится на основе того, как файлы изменились относительно друг друга, ключи выводятся в алфавитном порядке.
Отсутствие плюса или минуса говорит, что ключ есть в обоих файлах, и его значения совпадают. Во всех остальных ситуациях значение по ключу либо отличается, либо ключ есть только в одном файле.

## Сравнение плоских файлов
### Пример сравнения:
[![asciicast](https://asciinema.org/a/656587.svg)](https://asciinema.org/a/656587)


## Рекурсивное сравнение
### Пример сравнения:
[![asciicast](https://asciinema.org/a/657568.svg)](https://asciinema.org/a/657568)


Часто утилиты предоставляют вывод результата своих действий в разных форматах. Это бывает нужно при интеграции с другими системами или просто для удобства восприятия. Диф между файлами тоже можно отображать разными способами.
### Например:
[![asciicast](https://asciinema.org/a/657760.svg)](https://asciinema.org/a/657760)