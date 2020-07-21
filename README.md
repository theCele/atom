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

File Structure

    .
    ├── dist                                        # Compiled files
    ├── src                                         # Source files
    │   ├── main                                    # Main process
    │   │   ├── app                                 # Business logic
    │   │   │   ├── app.controller.ts               # Main controller (optional)
    │   │   │   ├── app.module.ts                   # Main module 
    │   │   │   ├── main.ts                         # Start file
    │   │   │   └── example                         # Module Example
    │   │   │       ├── example.controller.ts       # Module Example - controller (optional)
    │   │   │       └── example.module.ts           # Module Example - module
    │   │   ├── data                                # Data management (database and file manager)
    │   │   │   ├── file-manager.ts                 # 
    │   │   │   └── file-manager.utility.ts         # 
    │   │   └── models
    │   │
    │   ├── renderer                                # 
    │   └── modules                                 # 
    |           ├── main                            # 
    |           └── renderer                        # 
    └── ...
