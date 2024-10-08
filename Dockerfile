# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port on which the application will run
EXPOSE 5000

# Command to run the app
CMD ["sh", "-c", "python Login.py"]
