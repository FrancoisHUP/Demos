FROM postgres:15

# Install build tools and pgvector dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    postgresql-server-dev-15 \
    wget \
    git \
    && git clone https://github.com/pgvector/pgvector.git \
    && cd pgvector \
    && make \
    && make install \
    && cd .. \
    && rm -rf pgvector \
    && apt-get remove -y build-essential postgresql-server-dev-15 git wget \
    && apt-get autoremove -y \
    && apt-get clean
