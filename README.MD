# Performance Test for Frontend and Backend Integration

## Objective

The goal of this test is to load and display 100,000 assets in a performant and efficient manner.
Each asset should be in a component, and show all fields, in an manner as aesthetically pleasing as possible.
A search functionality should be implemented, to filter the results shown.

Candidates are encouraged to modify both the Go backend and the frontend parts of the repository to achieve optimal performance.
The Go backend provides an endpoint to fetch the assets and perform searches, and the frontend should be designed to efficiently handle and display this data.

## Notes

The focus of this task is on performance and efficiency in handling a large dataset.
We strive for excellence in everything we do, and we are looking for top-tier talent to join our team.
Code quality and adherence to best practices will be assessed.

### Backend Setup

1. **Generate the Database**
In the Backend folder

Run the following command to create and populate the SQLite database with 100,000 assets:
      
      go run cmd/db/main.go

2. **Start the API Server**

Run the following command to start the Go API server:

      go run cmd/api/main.go

The API server will be running at http://localhost:8080.

### Frontend Setup

1. **Start the Frontend**

Install Dependencies
     
      npm install

Run the Next.js Application

      npm run dev

The frontend application will be running at http://localhost:3000.

# API Endpoints

Get all assets or filter by host:

    GET http://localhost:8080/assets
    GET http://localhost:8080/assets?host=example

Get the total count of assets:

    GET http://localhost:8080/assets/count

