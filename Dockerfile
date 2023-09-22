# Usa un'immagine di base Node.js
FROM node:18

# Imposta la directory di lavoro nel container
WORKDIR /app

# Copia il package.json e il package-lock.json (se esiste) nella directory di lavoro
COPY package*.json ./

# Esegui npm install per installare le dipendenze
RUN npm install

# Copia il resto del codice sorgente nella directory di lavoro
COPY . .

# Compila il codice TypeScript
RUN npm run build

# Esponi la porta su cui il tuo server TypeScript ascolta (modifica la porta se necessario)
EXPOSE 8080

# Avvia l'applicazione TypeScript
CMD ["npm", "start"]