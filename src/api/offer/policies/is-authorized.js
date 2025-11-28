// dans ce fichier créer une policy qui :

const { pop } = require("../../../../config/middlewares");

// associer cette policy aux routes delete et update de la collection Offer

module.exports = async (policyContext, config, { strapi }) => {
  // récupère l'id de l'utilisateur qui fait la requête
  const userId = policyContext.state.user.id;

  // récupère l'id de l'offre, envoyé en params

  if (policyContext.request.params.id) {
    // va chercher l'offre en question, via l'Entity Service API, et déploie sa clef owner
    const offerId = policyContext.request.params.id;
    const offer = await strapi.entityService.findOne(
      "api::offer.offer",
      offerId,
      {
        populate: ["owner"],
      }
    );
    // si l'id du propriétaire n'est pas le même que l'id de la personne qui fait la requête, renvoyer une erreur, passer à la suite sinon
    if (offer.owner.id !== userId) {
      return false;
    } else {
      return true;
    }
  } else {
    const ownerId = JSON.parse(policyContext.request.body.data).owner;
    console.log(ownerId);
    if (userId !== ownerId) {
      return false;
    } else {
      return true;
    }
  }
};
