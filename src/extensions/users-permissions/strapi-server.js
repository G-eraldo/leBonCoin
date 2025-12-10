module.exports = (plugin) => {
  plugin.controllers.user.me = async (ctx) => {
    if (!ctx.state.user) {
      return ctx.unauthorized();
    }

    const user = await strapi.entityService.findOne(
      'plugin::users-permissions.user',
      ctx.state.user.id,
      { populate: ['userProfile'] }
    );

    ctx.body = user;
  };

  return plugin;
};
