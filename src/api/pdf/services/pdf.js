'use strict';

/**
 * pdf service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pdf.pdf');
