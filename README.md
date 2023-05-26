# NodeApp

Install dependencies with:

```sh
npm install
```

Copy .env.example to .env and customize your variables.

```sh
cp .env.example .env
```

Initialize the database with:

```sh
npm run initDB
```

Start in development mode:

```sh
npm run dev
```

Start in cluster mode:

```sh
npm run cluster
```


## General info

Application created with:

```sh
npx express-generator nodeapp --ejs
```

## Start a MongoDB Server in Macos or Linux

In the console go to MongoDB folder and:

```sh
./bin/mongod --dbpath ./data
```

## API Methods

API documentation can be used from: http://localhost:3001/api-doc/

### GET /api/anuncios
    "results": 
        {
            "_id": "646f7762b6c65cc78045e8a3",
            "nombre": "Bicicleta",
            "venta": true,
            "precio": 230.15,
            "foto": "bici.jpg",
            "tags": [
                "lifestyle",
                "motor"
            ],
            "__v": 0
        }