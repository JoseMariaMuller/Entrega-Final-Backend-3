const supertest = require("supertest");
const mongoose = require("mongoose");

jest.mock("../src/dao/models/User");
jest.mock("../src/dao/models/Pet");
jest.mock("../src/dao/models/Adoption");

const UserModel = require("../src/dao/models/User");
const PetModel = require("../src/dao/models/Pet");
const AdoptionModel = require("../src/dao/models/Adoption");

const app = require("../src/app");

const fakeUserId = new mongoose.Types.ObjectId();
const fakePetId = new mongoose.Types.ObjectId();
const fakeAdoptionId = new mongoose.Types.ObjectId();

const fakeUser = {
    _id: fakeUserId,
    first_name: "Juan",
    last_name: "Perez",
    email: "juan@test.com",
    password: "hashed_pass",
    role: "user",
    pets: [],
};

const fakePet = {
    _id: fakePetId,
    name: "Firulais",
    specie: "Dog",
    birthDate: "2020-01-01",
    adopted: false,
    owner: null,
    image: "firulais.jpg",
};

const fakeAdoption = {
    _id: fakeAdoptionId,
    owner: fakeUserId,
    pet: fakePetId,
};

const setupDefaultMocks = () => {
    UserModel.find = jest.fn().mockResolvedValue([fakeUser]);
    UserModel.findOne = jest.fn().mockResolvedValue({ ...fakeUser });
    UserModel.findByIdAndUpdate = jest.fn().mockResolvedValue({ ...fakeUser });
    UserModel.create = jest.fn().mockResolvedValue(fakeUser);

    PetModel.find = jest.fn().mockResolvedValue([fakePet]);
    PetModel.findOne = jest.fn().mockResolvedValue({ ...fakePet });
    PetModel.findByIdAndUpdate = jest.fn().mockResolvedValue({ ...fakePet });
    PetModel.create = jest.fn().mockResolvedValue(fakePet);

    AdoptionModel.find = jest.fn().mockResolvedValue([fakeAdoption]);
    AdoptionModel.findOne = jest.fn().mockResolvedValue({ ...fakeAdoption });
    AdoptionModel.findByIdAndUpdate = jest.fn().mockResolvedValue(fakeAdoption);
    AdoptionModel.create = jest.fn().mockResolvedValue(fakeAdoption);
};

beforeEach(() => {
    jest.clearAllMocks();
    setupDefaultMocks();
});

describe("GET /api/adoptions", () => {
    test("debe retornar status 200 y un array de adopciones", async () => {
        const response = await supertest(app).get("/api/adoptions");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(Array.isArray(response.body.payload)).toBe(true);
        expect(response.body.payload).toHaveLength(1);
    });

    test("cada adopcion debe tener owner y pet", async () => {
        const response = await supertest(app).get("/api/adoptions");
        const adoption = response.body.payload[0];
        expect(adoption).toHaveProperty("owner");
        expect(adoption).toHaveProperty("pet");
    });

    test("retorna array vacio cuando no hay adopciones", async () => {
        AdoptionModel.find = jest.fn().mockResolvedValue([]);
        const response = await supertest(app).get("/api/adoptions");
        expect(response.status).toBe(200);
        expect(response.body.payload).toEqual([]);
    });

    test("retorna 500 si falla la base de datos", async () => {
        AdoptionModel.find = jest.fn().mockRejectedValue(new Error("DB error"));
        const response = await supertest(app).get("/api/adoptions");
        expect(response.status).toBe(500);
        expect(response.body.status).toBe("error");
    });

    test("Content-Type debe ser application/json", async () => {
        const response = await supertest(app).get("/api/adoptions");
        expect(response.headers["content-type"]).toMatch(/application\/json/);
    });
});

describe("GET /api/adoptions/:aid", () => {
    test("debe retornar 200 y la adopcion buscada", async () => {
        AdoptionModel.findOne = jest.fn().mockResolvedValue(fakeAdoption);
        const response = await supertest(app).get(`/api/adoptions/${fakeAdoptionId}`);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.payload).toHaveProperty("owner");
        expect(response.body.payload).toHaveProperty("pet");
    });

    test("retorna 404 si la adopcion no existe", async () => {
        AdoptionModel.findOne = jest.fn().mockResolvedValue(null);
        const id = new mongoose.Types.ObjectId();
        const response = await supertest(app).get(`/api/adoptions/${id}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Adoption not found");
    });

    test("retorna 500 si falla la base de datos", async () => {
        AdoptionModel.findOne = jest.fn().mockRejectedValue(new Error("DB error"));
        const response = await supertest(app).get(`/api/adoptions/${fakeAdoptionId}`);
        expect(response.status).toBe(500);
        expect(response.body.status).toBe("error");
    });

    test("Content-Type debe ser application/json", async () => {
        const response = await supertest(app).get(`/api/adoptions/${fakeAdoptionId}`);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
    });
});

describe("POST /api/adoptions/:uid/:pid", () => {
    test("debe crear una adopcion y retornar 201", async () => {
        const response = await supertest(app).post(`/api/adoptions/${fakeUserId}/${fakePetId}`);
        expect(response.status).toBe(201);
        expect(response.body.status).toBe("success");
        expect(response.body.payload).toHaveProperty("_id");
        expect(response.body.payload).toHaveProperty("owner");
        expect(response.body.payload).toHaveProperty("pet");
    });

    test("retorna 404 si el usuario no existe", async () => {
        UserModel.findOne = jest.fn().mockResolvedValue(null);
        const id = new mongoose.Types.ObjectId();
        const response = await supertest(app).post(`/api/adoptions/${id}/${fakePetId}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("User not found");
    });

    test("retorna 404 si la mascota no existe", async () => {
        PetModel.findOne = jest.fn().mockResolvedValue(null);
        const id = new mongoose.Types.ObjectId();
        const response = await supertest(app).post(`/api/adoptions/${fakeUserId}/${id}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Pet not found");
    });

    test("retorna 400 si la mascota ya fue adoptada", async () => {
        PetModel.findOne = jest.fn().mockResolvedValue({ ...fakePet, adopted: true });
        const response = await supertest(app).post(`/api/adoptions/${fakeUserId}/${fakePetId}`);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Pet is already adopted");
    });

    test("verifica que se actualiza la mascota y el usuario en la DB", async () => {
        await supertest(app).post(`/api/adoptions/${fakeUserId}/${fakePetId}`);
        expect(PetModel.findByIdAndUpdate).toHaveBeenCalledWith(
            fakePetId,
            expect.objectContaining({ $set: expect.objectContaining({ adopted: true }) }),
            expect.any(Object)
        );
        expect(UserModel.findByIdAndUpdate).toHaveBeenCalled();
        expect(AdoptionModel.create).toHaveBeenCalledWith(
            expect.objectContaining({ owner: fakeUserId, pet: fakePetId })
        );
    });

    test("retorna 500 si hay un error inesperado", async () => {
        UserModel.findOne = jest.fn().mockRejectedValue(new Error("DB error"));
        const response = await supertest(app).post(`/api/adoptions/${fakeUserId}/${fakePetId}`);
        expect(response.status).toBe(500);
        expect(response.body.status).toBe("error");
    });

    test("Content-Type debe ser application/json", async () => {
        const response = await supertest(app).post(`/api/adoptions/${fakeUserId}/${fakePetId}`);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
    });
});

describe("Estructura general de la API", () => {
    test("ruta raiz GET / debe responder 200", async () => {
        const response = await supertest(app).get("/");
        expect(response.status).toBe(200);
    });

    test("ruta inexistente debe retornar 404", async () => {
        const response = await supertest(app).get("/api/ruta-que-no-existe");
        expect(response.status).toBe(404);
    });

    test("respuestas exitosas tienen status success", async () => {
        const response = await supertest(app).get("/api/adoptions");
        expect(response.body.status).toBe("success");
    });

    test("respuestas exitosas tienen el campo payload", async () => {
        const response = await supertest(app).get("/api/adoptions");
        expect(response.body).toHaveProperty("payload");
    });
});