const { Router } = require("express");
const petsController = require("../controllers/pets.controller");

const router = Router();

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Obtiene todas las mascotas
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de mascotas
 *       500:
 *         description: Error del servidor
 */
router.get("/", petsController.getAllPets);

/**
 * @swagger
 * /api/pets/{pid}:
 *   get:
 *     summary: Obtiene una mascota por ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mascota encontrada
 *       404:
 *         description: Mascota no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get("/:pid", petsController.getPetById);

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Crea una nueva mascota
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specie
 *             properties:
 *               name:
 *                 type: string
 *               specie:
 *                 type: string
 *               birthDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mascota creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/", petsController.createPet);

module.exports = router;