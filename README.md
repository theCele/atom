# atom

# A progressive Electron Main Process framework

## Install

This package works only in Electron.js environment

```bash
# Install dependency - reflect-metadata
npm install --save reflect-metadata
# install atom
npm install --save github:thecele/atom
```

## How To
```bash
# Module Decorators - class
@Moduel({ controllers?: any[], children?: any[] })

# Controller Decorators - class
@Controller()

# Controller Decorators - method
@Ipc(channel?: string)
```