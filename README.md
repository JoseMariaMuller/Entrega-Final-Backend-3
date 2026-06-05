# Adoption API — Coderhouse Backend III

**Tests funcionales + Docker** | Programación Backend III: Testing y Escalabilidad

---

## Descripción

API REST para gestión de adopciones de mascotas desarrollada con **Node.js + Express + MongoDB**.  
Incluye tests funcionales con **Jest + Supertest** y contenerización con **Docker**.

---

## Estructura del proyecto

```
Backend3/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── swagger.js
│   ├── routers/
│   │   ├── adoption.router.js
│   │   ├── users.router.js
│   │   └── pets.router.js
│   ├── controllers/
│   │   ├── adoptions.controller.js
│   │   ├── users.controller.js
│   │   └── pets.controller.js
│   ├── dao/
│   │   ├── models/
│   │   │   ├── Adoption.js
│   │   │   ├── Pet.js
│   │   │   └── User.js
│   │   └── mongo/
│   │       ├── GenericDAO.js
│   │       ├── AdoptionsDAO.js
│   │       ├── PetsDAO.js
│   │       └── UsersDAO.js
│   └── services/
│       └── adoptions.service.js
├── test/
│   └── adoption.router.test.js
├── Dockerfile
├── .dockerignore
├── .env.example
├── package.json
└── README.md
```

---

## Endpoints

### Adoptions

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/adoptions` | Obtiene todas las adopciones |
| `GET` | `/api/adoptions/:aid` | Obtiene una adopción por ID |
| `POST` | `/api/adoptions/:uid/:pid` | Crea una nueva adopción |

### Users

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/users` | Obtiene todos los usuarios |
| `GET` | `/api/users/:uid` | Obtiene un usuario por ID |
| `POST` | `/api/users` | Crea un nuevo usuario |

### Pets

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/pets` | Obtiene todas las mascotas |
| `GET` | `/api/pets/:pid` | Obtiene una mascota por ID |
| `POST` | `/api/pets` | Crea una nueva mascota |

---

## Documentación Swagger

Con el servidor corriendo, accedé a la documentación interactiva en:

```
http://localhost:8080/api-docs
```

---

## Correr los tests

```bash
pnpm install
pnpm test
```

---

## Docker

### Construir la imagen

```bash
docker build -t josemariamuller/adoption-api:1.0.0 .
```

### Ejecutar el contenedor

```bash
docker run -d -p 8080:8080 \
  -e MONGO_URL="mongodb+srv://usuario:password@cluster.mongodb.net/backend3" \
  --name adoption-api josemariamuller/adoption-api:1.0.0
```

### Ver logs

```bash
docker logs adoption-api
```

---

## Imagen en DockerHub

🔗 https://hub.docker.com/r/josemariamuller/adoption-api

```bash
docker pull josemariamuller/adoption-api:1.0.0
```

---

## Repositorio

🔗 https://github.com/JoseMariaMuller/Entrega-Final-Backend-3

---

## Variables de entorno

| Variable | Default | Descripción |
|----------|---------|-------------|
| `PORT` | `8080` | Puerto del servidor |
| `MONGO_URL` | `mongodb://localhost:27017/adoptions` | URI de MongoDB |
| `NODE_ENV` | `development` | Entorno |