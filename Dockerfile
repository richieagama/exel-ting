# Stage 1: Build the React app
FROM node:14 AS frontend-build

WORKDIR /app

COPY ./csv-uploader/package*.json ./
RUN npm install

COPY ./csv-uploader ./
RUN npm run build

# Stage 2: Set up the backend and serve the React app
FROM python:3.9-slim

WORKDIR /app

COPY ./backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY ./backend ./

# Copy the build files from the frontend build stage
COPY --from=frontend-build /app/build ./build

# Expose the port the app runs on
EXPOSE 5000

CMD ["python", "app.py"]
