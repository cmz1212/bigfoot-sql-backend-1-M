const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAllSightings.bind(this.controller));
    router.get("/:sightingId", this.controller.getOneSighting.bind(this.controller));
    router.post("/", this.controller.postOneSighting.bind(this.controller));
    router.get("/:sightingId/comments", this.controller.getAllComments.bind(this.controller));
    router.post("/:sightingId/comments", this.controller.createOneComment.bind(this.controller));
    return router;
  }
}

module.exports = SightingsRouter;