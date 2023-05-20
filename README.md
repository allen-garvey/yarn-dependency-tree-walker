# Yarn Dependency Tree Walker

Determine what depends on a given dependency by reading a yarn lockfile. This is useful if you want to update a given dependency, but don't know what depends on it.

## Dependencies

* node >= 16
* yarn or npm

## Getting Started

* `npm install` or `yarn install`
* `node src.js path/to/yarn.lock dependency@version` (`yarn example` for an example)

## License

Yarn Dependency Tree Walker is released under the MIT License. See license.txt for more details.