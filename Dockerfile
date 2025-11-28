# Étape 1 : Build (Compiler l'application)
# Utiliser une image Node.js récente (20.x, comme défini dans votre package.json)
FROM node:20-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Installer Yarn globalement
RUN npm install -g yarn

# Copier les fichiers package.json et yarn.lock
COPY package.json yarn.lock ./

# Installer les dépendances
# Ceci utilise yarn.lock
RUN yarn install --production

# Copier le reste du code
COPY . .

# Exécuter la commande de compilation de Strapi
RUN yarn build

# Étape 2 : Production (Image légère pour l'exécution)
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier l'environnement de production et le code compilé
# Copie les fichiers essentiels pour l'exécution (node_modules, build, etc.)
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
COPY package.json ./
COPY .env.example ./

# Copier les fichiers de configuration Strapi
COPY config/ ./config
COPY src/ ./src

# Exposer le port par défaut de Strapi
EXPOSE 1337

# Définir la commande de démarrage (utilise l'entrée de votre package.json)
CMD ["yarn", "start"]