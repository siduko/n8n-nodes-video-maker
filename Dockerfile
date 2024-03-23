ARG NODE_VERSION=18
ARG N8N_VERSION=1.18.0
FROM n8nio/base:${NODE_VERSION}

ARG N8N_VERSION
RUN if [ -z "$N8N_VERSION" ] ; then echo "The N8N_VERSION argument is missing!" ; exit 1; fi

ENV N8N_VERSION=${N8N_VERSION}
#ENV NODE_ENV=production
ENV N8N_RELEASE_TYPE=stable
RUN set -eux; \
        apkArch="$(apk --print-arch)"; \
        case "$apkArch" in \
        'armv7') apk --no-cache add --virtual build-dependencies python3 build-base;; \
        esac && \
        npm install -g --omit=dev n8n@${N8N_VERSION} && \
        case "$apkArch" in \
        'armv7') apk del build-dependencies;; \
        esac && \
        rm -rf /usr/local/lib/node_modules/n8n/node_modules/n8n-design-system && \
        rm -rf /usr/local/lib/node_modules/n8n/node_modules/n8n-editor-ui/node_modules && \
        find /usr/local/lib/node_modules/n8n -type f -name "*.ts" -o -name "*.js.map" -o -name "*.vue" | xargs rm && \
        rm -rf /root/.npm

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont

RUN apk add --no-cache \
    build-base \
    ffmpeg \
    xvfb \
    make python3 g++ cairo cairo-dev giflib-dev libpng libjpeg \
    libxext-dev python3 pkgconf libxi-dev make g++ mesa-dev \
    libxi-dev glu-dev glew-dev pkgconfig \
    # pillow dependencies
    pango pango-dev jpeg-dev zlib-dev freetype-dev lcms2-dev openjpeg-dev tiff-dev tk-dev tcl-dev

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser


COPY docker-entrypoint.sh /

RUN \
        mkdir .n8n && \
        chown node:node .n8n
USER node

WORKDIR /home/node/.n8n/custom/n8n-nodes-video-maker

ENTRYPOINT ["tini", "--", "/docker-entrypoint.sh"]
