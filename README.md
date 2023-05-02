# Knots and crosses multiplayer server
A remote service to support online multiplayer for the game.

Refer to https://github.com/iljakumlander/tictactoe for client code.

## Installation
```sh
npm install
```

### Port configuration in `.env` file
Application builds on port `5000` by default, to change default value, create `.env` file with this content:
```sh
PORT=5000
```

### CORS
Modify `.env` file and add `ORIGIN` property to set speceific access origin (defaults to `*`).
```sh
ORIGIN=*
```

## Run
```sh
npm start
```
