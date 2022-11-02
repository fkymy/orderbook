docker compose rm postgres -s -f -v
docker compose up postgres -d
sleep 1
prisma migrate deploy
