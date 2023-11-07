FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat
RUN apk update

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set working directory
WORKDIR /app

# remove all empty node_modules folder structure
RUN rm -rf /app/out/full/*/*/node_modules

FROM base AS builder

RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@marshallku/chat --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN pnpm turbo run build --filter=@marshallku/chat...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/chat/next.config.js .
COPY --from=installer /app/apps/chat/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/chat/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/chat/.next/static ./apps/chat/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/chat/public ./apps/chat/public

CMD node apps/chat/server.js
