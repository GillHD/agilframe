<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/GillHD/agilframe-core/main/agil/websdk/demo/public/branding/agil-logo-on-dark.png">
    <img alt="AgilFrame" width="360" src="https://raw.githubusercontent.com/GillHD/agilframe-core/main/agil/websdk/demo/public/branding/agil-logo-on-light.png">
  </picture>
</p>

# AgilFrame

**Встраиваемые видеозвонки, трансляции и голосовые комнаты на WebRTC для своей инфраструктуры.** AgilFrame помогает встроить звонки в корпоративный портал, учебную платформу или клиентский продукт и управлять участниками, оформлением и обработкой данных из своей системы.

[Начать работу](#начать-работу) · [Документация](https://github.com/GillHD/agilframe-core/blob/main/docs/README.md) · [Доска AgilFrame](https://github.com/users/GillHD/projects/1) · [Правила вкладов](CONTRIBUTING.md)

## Репозитории

| Компонент | Назначение |
| --- | --- |
| [Core](https://github.com/GillHD/agilframe-core) | Сервер на Node.js, API, организации, права, панель управления, редактор и Wiki |
| [Web SDK](https://github.com/GillHD/agilframe-websdk) | Виджет, SDK, Web Component и клиентские контракты |
| [Mobile SDK](https://github.com/GillHD/agilframe-mobile) | Android, iOS, Flutter, Capacitor и React Native |
| [Ноды](https://github.com/GillHD/agilframe-nodes) | LiveKit SFU, TURN, Node Agent, STT, Edge и образы воркеров |
| [Edge для внешних устройств](https://github.com/GillHD/agilframe-nodes/tree/main/agil/edge) | Контроллер на Node.js и FFmpeg для публикации MP4 в комнату через RTMP/RTMPS. Входит в репозиторий нод |
| [Развёртывание](https://github.com/GillHD/agilframe-deploy) | Самостоятельная установка Core через Docker Compose |
| [Примеры](https://github.com/GillHD/agilframe-examples) | Рабочий пример встраивания комнаты в приложение |

## Начать работу

- Чтобы запустить свою установку, откройте [развёртывание](https://github.com/GillHD/agilframe-deploy) и выполните шаги Docker Compose.
- Чтобы изучить интеграцию, запустите Core и проверьте [веб-пример](https://github.com/GillHD/agilframe-examples) с комнатой и токеном участника.
- Для разработки всего комплекта клонируйте общий репозиторий вместе с подмодулями.

```sh
git clone --recurse-submodules https://github.com/GillHD/agilframe.git
cd agilframe
```

Получатся каталоги `core/`, `websdk/`, `mobile/`, `nodes/`, `deploy/` и `examples/`. Каждый компонент также можно клонировать отдельно. Подмодули закреплены на совместимых коммитах. [Порядок обновления](docs/repositories.md)

## Как работает AgilFrame

Core выдаёт токены комнат, проверяет права и назначает маршрут. WebRTC-клиенты подключаются напрямую или через SFU. TURN используется при выборе релейного соединения. Запись, публикация HLS и распознавание речи подключаются по требованиям установки. [Архитектура Core](https://github.com/GillHD/agilframe-core/blob/main/agil/core/docs/architecture.md) · [Масштабирование](https://github.com/GillHD/agilframe-core/blob/main/agil/core/docs/scaling.md)

Исходный код доступен по [PolyForm Noncommercial 1.0.0](LICENSE). Коммерческие права оформляются [отдельным договором](https://github.com/GillHD/agilframe-core/blob/main/agil/core/docs/commercial-license.md). [Уведомления](NOTICE)
