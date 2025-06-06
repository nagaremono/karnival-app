#!/bin/bash

parallel -j 4 -- \
  'cd server && yarn watch' \
  'cd server && yarn dev' \
  'cd web && pnpm dev' \
  'cd web && pnpm graphql-generate:watch'
