from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

# Database connection details
db_config = {
    'user': 'root',
    'password': '',
    'host': 'localhost',
    'database': 'gov_user_data'
}

def get_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

@app.route('/api/image-link/<image_id>', methods=['GET'])
def get_image_link(image_id):
    conn = get_db_connection()
    if not conn:
        return "Database connection failed", 500
    
    cursor = conn.cursor()
    query = "SELECT link FROM dashboards WHERE role_name = %s"
    cursor.execute(query, (image_id,))
    result = cursor.fetchone()

    conn.close()

    if result:
        return result[0], 200  # Directly return the link as a plain string
    else:
        return "Link not found", 404

if __name__ == '__main__':
    app.run(debug=True)
