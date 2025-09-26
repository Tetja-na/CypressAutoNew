FROM cypress/included:9.7.0

# Встановити Firefox (якщо він не встановлений)
RUN apt-get update && apt-get install -y firefox-esr

WORKDIR /e2e

COPY ./cypress ./cypress
COPY ./cypress.config.js ./cypress.config.js
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

CMD ["npx", "cypress", "run", "--browser", "firefox"]
