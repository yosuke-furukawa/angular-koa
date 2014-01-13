
# Koa API Boilerplate

  Boilerplate API application structure - at least one flavour.

## Installation

  cloneeeee

## Usage

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

## API Versioning

  Use a proxy for `/v1`, `/v2` etc and launch new `api(1)` programs, don't version
  in the same application, it's brittle, bloaty and pointless.

# License

  MIT