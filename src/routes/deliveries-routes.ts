import { Router } from "express";

import { DeliveriesControler } from "@/controllers/deliveries-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { DeliveriesStatusController } from "@/controllers/deliveries-status-controller";

const deliveriesRoutes = Router()
const deliveriesControler = new DeliveriesControler()
const deliveriesStatusController = new DeliveriesStatusController()

deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]))
deliveriesRoutes.post("/", deliveriesControler.create)
deliveriesRoutes.get("/", deliveriesControler.index)

deliveriesRoutes.patch("/:id/status", deliveriesStatusController.update)

export { deliveriesRoutes }
