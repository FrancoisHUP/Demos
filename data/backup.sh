# backup
docker exec -t postgres_pgvector pg_dump -U myuser mydatabase > backup.sql

# restore
# docker exec -i postgres_pgvector psql -U myuser mydatabase < backup.sql