import psycopg2

# Database connection config
DB_NAME = "Employee"
DB_USER = "postgres"
DB_PASSWORD = "root5113"
DB_HOST = "host.docker.internal"
DB_PORT = "5432"

conn = None  # Declare at top to avoid NameError in finally

try:
    # Connect to PostgreSQL
    conn = psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT
    )
    cursor = conn.cursor()
    print("✅ Connected to the database successfully!")

    # Create table if it doesn't exist
    create_table_query = """
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        designation VARCHAR(100),
        company VARCHAR(100)
    );
    """
    cursor.execute(create_table_query)
    conn.commit()

    # Take user input
    name = input("Enter your name: ")
    designation = input("Enter your designation: ")
    company = input("Enter your company: ")

    # Insert data into the table
    insert_query = "INSERT INTO users (name, designation, company) VALUES (%s, %s, %s);"
    cursor.execute(insert_query, (name, designation, company))
    conn.commit()

    print("✅ Data inserted successfully!")

except Exception as e:
    print("❌ Error:", e)

finally:
    if conn:
        cursor.close()
        conn.close()
        print("🔌 Database connection closed.")