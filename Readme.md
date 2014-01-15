# Koa API Boilerplate

  Boilerplate API application structure - at least one flavour.

## Installation

```
  git clone https://github.com/yosuke-furukawa/angular-koa.git
  cd angular-koa
  npm install
  bower install
```

## Start

```
  npm start
```

or 

```
  node --harmony ./bin/api
```

## `./bin/api` Usage

```

  Usage: api [options]

  Options:

    -h, --help            output usage information
    -H, --host <host>     specify the host [0.0.0.0]
    -p, --port <port>     specify the port [4000]
    -b, --backlog <size>  specify the backlog size [511]

```

## Structure

  Resources and associated tests are defined in ./api

##  Tests

  Run `make test`

### Requirement Middleware

  redis-server
  mongoDB
  
  If you have `brew`, execute following commands:
  
  ```
  brew install redis
  brew install mongodb
  ```


# License

  MIT
