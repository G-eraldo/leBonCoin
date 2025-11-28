"use strict";

const deleteAll = require("../routes/delete-all");

/**
 * offer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::offer.offer", ({ strapi }) => ({
  async deleteAll(ctx) {
    try {
      const userId = ctx.state.user.id;
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userId,
        {
          populate: ["offers"],
        }
      );
      const offer = user.offers;
      for (let i = 0; i < user.offers.length; i++) {
        await strapi.entityService.delete("api::offer.offer", offer[i].id);
      }
      return { message: "toutes les annonces ont été supprimées" };
    } catch (error) {
      ctx.response.status = 500;
      return { message: error.message };
    }
  },
  // async create(ctx) {
  //   try {
  //     const requesterId = ctx.state.user.id;
  //     const parseBody = JSON.parse(ctx.request.body.data);
  //     const ownerId = parseBody.owner;
  //     if (requesterId !== ownerId) {
  //       ctx.response.status = 403;
  //       return { message: "Vous n'êtes pas autorisé à créer cette offre" };
  //     } else {
  //       const { data, meta } = await super.create(ctx);
  //       return { data, meta };
  //     }
  //   } catch (error) {
  //     ctx.response.status = 500;
  //     return { message: error.message };
  //   }
  // },
}));
