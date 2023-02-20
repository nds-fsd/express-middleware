# step 1

```bash
npm i typescript ts-node @types/node @types/express
```

# step 2

```bash
tsc --init
```

configure the tsconfig:

- target: es6
- outDir: './build'
- rootDir: '/src'

# step 3

add the following scripts to package.json
"start": "node ./build/index.js",
"build": "tsc -p .",
"dev": "nodemon ./src/index.ts"
