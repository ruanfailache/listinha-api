#!/bin/sh
npm run build
npx prisma generate
npx prisma migrate deploy
npm run start