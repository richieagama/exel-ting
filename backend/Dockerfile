# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Copy the build files from the frontend
COPY ../csv-uploader/build ./build

# Specify the command to run the application
CMD ["python", "app.py"]
