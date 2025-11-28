# Étape 1 : Build (Compiler l'application)
# Utiliser une image Node.js récente (20.x, comme défini dans votre package.json)
FROM node:20-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Ligne supprimée : RUN npm install -g yarn
# Nous supposons que Yarn est déjà installé sur l'image Node officielle.

# Copier les fichiers package.json et yarn.lock
COPY package.json yarn.lock ./

# Installer les dépendances
# Ceci utilise yarn.lock
RUN yarn install --production

# Copier le reste du code
COPY . .

# Exécuter la commande de compilation de Strapi
# Ceci prépare l'interface d'administration et les fichiers statiques
RUN yarn build

# Étape 2 : Production (Image légère pour l'exécution)
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires pour l'exécution (node_modules, build, config, etc.)
# Ceci est plus léger que de copier tout le répertoire /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
COPY package.json ./

# Copier les fichiers spécifiques à l'application
# Si vous utilisez un .env, il ne doit PAS être committé pour des raisons de sécurité.
# On copie ici le .env.example (pour l'exemple) et les répertoires de code source.
COPY .env.example ./ 
COPY config/ ./config
COPY src/ ./src

# Exposer le port par défaut de Strapi
EXPOSE 1337

# Définir la commande de démarrage (utilise le script 'start' de votre package.json)
CMD ["yarn", "start"]