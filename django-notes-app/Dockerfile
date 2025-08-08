FROM python:3.9

WORKDIR /app/backend

COPY requirements.txt /app/backend

# Install PostgreSQL client libraries instead of MySQL
RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y gcc libpq-dev pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/backend

EXPOSE 8000
# RUN python manage.py migrate
# RUN python manage.py makemigrations