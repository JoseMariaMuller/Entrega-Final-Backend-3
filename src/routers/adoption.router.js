const { Router } = require("express");
const adoptionsController = require("../controllers/adoptions.controller");

const router = Router();

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtiene todas las adopciones
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: Lista de adopciones
 *       500:
 *         description: Error del servidor
 */
router.get("/", adoptionsController.getAllAdoptions);

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   get:
 *     summary: Obtiene una adopción por ID
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopción encontrada
 *       404:
 *         description: Adopción no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get("/:aid", adoptionsController.getAdoptionById);

/**
 * @swagger
 * /api/adoptions/{uid}/{pid}:
 *   post:
 *     summary: Crea una nueva adopción
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Adopción creada exitosamente
 *       400:
 *         description: La mascota ya fue adoptada
 *       404:
 *         description: Usuario o mascota no encontrados
 *       500:
 *         description: Error del servidor
 */
router.post("/:uid/:pid", adoptionsController.createAdoption);

module.exports = router;