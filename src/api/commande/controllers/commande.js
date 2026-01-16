"use strict";

/**
 * commande controller
 */

const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::commande.commande",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        const { token, amount, content, user_profile } = ctx.request.body.data;

        const { status } = await stripe.charges.create({
          // desctructuring de la clé status de la réponse de stripe
          amount: amount * 100, // prix en centime
          currency: "eur", // devise
          description: `Paiement image : ${content}`, // identification de la commande
          source: token, // le token de stripe
        });
        if (status === "succeeded") {
          // On prépare les données pour Strapi (nécessite un objet data)
          ctx.request.body.data = {
            amount: amount,
            content: content,
            user_profile: user_profile,
            status: status,
          };

          const { data, meta } = await super.create(ctx);
          return { status: status, data: data };
        }
      } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { error: error.message };
      }
    },
  })
);
