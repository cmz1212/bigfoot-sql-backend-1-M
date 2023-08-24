const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel) {
    super(model);
    this.commentModel = commentModel;
  }

  // Retrieve specific sighting
  async getOneSighting(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Add a new sighting
  async postOneSighting(req, res) {
    try {
      // Get the input data from the request body
      const { date, location, notes } = req.body;

      // Create a new sighting record using Sequelize's create method
      const newSighting = await this.model.create({
        date: new Date(date),
        location,
        notes,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

    // Retrieve all comments using sighting_id
    async getAllComments(req, res) {
      const { sightingId } = req.params;
      try {
        // Assuming your "comment" model is named "commentModel"
        const comments = await this.commentModel.findAll({
          where: {
            sighting_id: sightingId,
          },
        });
        return res.json(comments);
      } catch (err) {
        return res.status(400).json({ error: true, msg: err });
      }
    }
  
    // Add a new comment
    async createOneComment(req, res) {
      const { sightingId } = req.params;
      try {
        // Get the input data from the request body
        const { content } = req.body;
  
        // Create a new sighting record using Sequelize's create method
        const newComment = await this.commentModel.create({
          content,
          sightingId,
          created_at: new Date(),
          updated_at: new Date(),
        });
  
        return res.json(newComment);
      } catch (err) {
        return res.status(400).json({ error: true, msg: err });
      }
    }
}

module.exports = SightingsController;
