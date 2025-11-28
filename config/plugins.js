module.exports = ({ env }) => ({
  // ... Éventuelles autres clefs
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        CLOUDINARY_URL: env("CLOUDINARY_URL"),
      },
      actionOptions: {
        upload: {},
        uploadStream: {
          timeout: 1000 * 600 * 3,
        },
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: "strapi-provider-email-resend",
      providerOptions: {
        apiKey: env("RESEND_API_KEY"), // Required
      },
      settings: {
        defaultFrom: "contact@lafabriqueducode.fr",
        defaultReplyTo: "contact@lafabriqueducode.fr",
      },
    },
  },
  // ... Éventuelles autres clefs
});
