# BikeService Application

## Project Introduction

The BikeService Application is designed to facilitate interactions between customers and bike service providers. Customers can order bike services, and service providers can add and manage their services. The application aims to streamline the process of booking and providing bike services, ensuring a smooth and efficient experience for both parties.

## Tech Stack

The project leverages a modern tech stack to ensure a robust and scalable application:

### Backend
- **Spring Boot:** A powerful, easy-to-use framework for building Java-based applications. Spring Boot simplifies the configuration and setup of new Spring applications, providing a wide range of features to support the development of enterprise-grade applications.

### Frontend
- **Angular:** A popular framework for building dynamic single-page applications (SPAs) using TypeScript. Angular offers a comprehensive set of tools and best practices for building scalable and maintainable web applications.

### Database
- **MySQL:** A reliable and widely-used relational database management system. MySQL is known for its performance, reliability, and ease of use, making it a great choice for managing the application's data.

## Why These Technologies?

- **Spring Boot:** Chosen for its simplicity and powerful features. Spring Boot allows for rapid development of production-ready applications with minimal configuration. Its extensive ecosystem provides various modules and extensions, making it easier to integrate with other technologies.
  
- **Angular:** Selected for its ability to build dynamic and responsive user interfaces. Angular's component-based architecture promotes reusability and maintainability, while its powerful data binding and dependency injection features enhance productivity and code quality.
  
- **MySQL:** Preferred for its robustness and efficiency in handling relational data. MySQL's support for complex queries and transactions ensures data integrity and performance, making it ideal for the application's needs.

## Database Schema

The database schema for this project consists of several tables, each serving a specific purpose in managing bike services, customers, and bookings. Below is a detailed explanation of each table and its relationships.

### Tables and Relationships

#### `customers`
- **Fields:**
  - `id` (bigint, primary key)
  - `account_created` (datetime)
  - `email` (varchar(255))
  - `lastlogin` (datetime)
  - `name` (varchar(255))
  - `password` (varchar(255))
  - `phone_number` (varchar(255))
  - `role` (tinyint)

#### `owners`
- **Fields:**
  - `id` (bigint, primary key)
  - `account_created` (datetime)
  - `email` (varchar(255))
  - `name` (varchar(255))
  - `password` (varchar(255))
  - `phone_number` (varchar(255))
  - `role` (tinyint)

#### `bookings`
- **Fields:**
  - `id` (bigint, primary key)
  - `booked_date` (datetime)
  - `brand` (varchar(255))
  - `date` (datetime)
  - `model` (varchar(255))
  - `service_id` (int)
  - `status` (tinyint)
  - `vehicle_number` (varchar(255))
  - `year` (int)
  - `cus_id` (bigint, foreign key references `customers.id`)

#### `bike_services`
- **Fields:**
  - `id` (int, primary key)
  - `charges` (int)
  - `description` (varchar(255))
  - `location` (varchar(255))
  - `service_name` (varchar(255))
  - `owner_id` (bigint, foreign key references `owners.id`)

#### Sequences
- **`owners_seq`**
  - `next_val` (bigint)

- **`customers_seq`**
  - `next_val` (bigint)

- **`bookings_seq`**
  - `next_val` (bigint)

- **`bike_services_seq`**
  - `next_val` (bigint)

### Entity Relationships
- **Customers and Bookings:**
  - A customer can have multiple bookings. This relationship is represented by the foreign key `cus_id` in the `bookings` table, referencing the `id` field in the `customers` table.
  
- **Owners and Bike Services:**
  - An owner can provide multiple bike services. This relationship is represented by the foreign key `owner_id` in the `bike_services` table, referencing the `id` field in the `owners` table.

### Database Schema Diagram

![Database Schema](src\main\tableimage\bikeservices-table diagram.png)

### Sample Data

#### `customers`

| id  | account_created      | email                | lastlogin          | name         | password  | phone_number | role |
|-----|----------------------|----------------------|--------------------|--------------|-----------|--------------|------|
| 1   | 2023-01-01 12:00:00  | customer1@example.com| 2023-07-01 08:00:00| John Doe     | password1 | 1234567890   | 1    |
| 2   | 2023-01-02 13:00:00  | customer2@example.com| 2023-07-02 09:00:00| Jane Smith   | password2 | 0987654321   | 1    |

#### `owners`

| id  | account_created      | email                | name           | password  | phone_number | role |
|-----|----------------------|----------------------|----------------|-----------|--------------|------|
| 1   | 2023-01-01 12:00:00  | owner1@example.com   | Mike Johnson   | password1 | 1234567890   | 2    |
| 2   | 2023-01-02 13:00:00  | owner2@example.com   | Emily Brown    | password2 | 0987654321   | 2    |

#### `bookings`

| id  | booked_date          | brand       | date                | model      | service_id | status | vehicle_number | year | cus_id |
|-----|----------------------|-------------|---------------------|------------|------------|--------|----------------|------|--------|
| 1   | 2023-07-01 08:00:00  | Honda       | 2023-07-05 10:00:00 | CB500F     | 1          | 1      | ABC123         | 2020 | 1      |
| 2   | 2023-07-02 09:00:00  | Yamaha      | 2023-07-06 11:00:00 | MT-07      | 2          | 1      | XYZ789         | 2021 | 2      |

#### `bike_services`

| id  | charges | description          | location      | service_name | owner_id |
|-----|---------|----------------------|---------------|--------------|----------|
| 1   | 100     | Basic Service        | New York      | Basic        | 1        |
| 2   | 150     | Premium Service      | Los Angeles   | Premium      | 2        |

#### Sequences

| next_val |
|----------|
| 1        |

# Bike Service API Documentation

This repository contains the OpenAPI documentation for the Bike Service API, which allows owners to manage services and bookings, and customers to view services and make bookings.

## Authentication

To access protected endpoints, you need to authenticate. Use the `/api/auth/owner/signup` or `/api/auth/customer/signup` endpoints to sign up and obtain a token. Include this token in the `Authorization` header for subsequent requests.

## Endpoints

### Owners

#### Add Services

Add services to the store.

- **URL:** `/api/owners/add-services`
- **Method:** POST
- **Request Body:** [Servicesdto](#servicesdto)
- **Responses:** 
  - 200: Success
  - 403: Unauthorized/InvalidToken/ExpiredToken

#### Edit Service

Edit details of a service.

- **URL:** `/api/owners/edit-service/{serviceId}`
- **Method:** PATCH
- **Path Parameters:** `serviceId` (integer)
- **Request Body:** [BikeServices](#bikeservices)
- **Responses:** 
  - 200: OK
  - 403: Unauthorized/InvalidToken/ExpiredToken

#### View Services

View all services offered by the owner.

- **URL:** `/api/owners/your-services`
- **Method:** GET
- **Responses:** 
  - 200: Success
  - 403: Unauthorized/InvalidToken/ExpiredToken

#### Manage Bookings

View all bookings made to the owner.

- **URL:** `/api/owners/bookings`
- **Method:** GET
- **Responses:** 
  - 200: Success
  - 403: Unauthorized/InvalidToken/ExpiredToken

### Customers

#### Book Service

Choose a service and book it.

- **URL:** `/api/customers/services/{serviceId}`
- **Method:** POST
- **Path Parameters:** `serviceId` (integer)
- **Request Body:** [Bookingdto](#bookingdto)
- **Responses:** 
  - 200: Success/Booked/Mail-Sent
  - 403: Unauthorized/InvalidToken/ExpiredToken

#### View Services

View all services offered.

- **URL:** `/api/customers/all-services`
- **Method:** GET
- **Responses:** 
  - 200: Success
  - 403: Unauthorized/InvalidToken/ExpiredToken

#### Check Booking Status

Check the status of a booking.

- **URL:** `/api/customers/status/{status}`
- **Method:** GET
- **Path Parameters:** `status` (string)
- **Responses:** 
  - 200: Success
  - 403: Unauthorized/InvalidToken/ExpiredToken

#### View Bookings

View all bookings made.

- **URL:** `/api/customers/bookings`
- **Method:** GET
- **Responses:** 
  - 200: Success
  - 403: Unauthorized/InvalidToken/ExpiredToken

## Data Models

### Servicesdto

```json
{
  "serviceName": "string",
  "description": "string",
  "charges": "string"
}

{
  "serviceName": "string",
  "description": "string",
  "charges": "string",
  "owner": "string",
  "vehicles": "string"
}

{
  "serviceId": "integer",
  "bookingdate": "date"
}

{
  "bookingId": "integer",
  "customer": "string",
  "bookingdate": "date",
  "status": "string"
}

{
  "customerName": "string",
  "emailId": "string",
  "contactNo": "string"
}

# Project Name

## Deployment

### Prerequisites
- Node.js and npm installed locally
- Angular CLI installed (`npm install -g @angular/cli`)
- Java Development Kit (JDK) installed (version 8 or higher)
- Maven installed (for building Spring Boot applications)
- MySQL installed and running locally or accessible database instance

### Frontend Deployment (Angular)
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd frontend
   npm install
   ng serve
   ng build --prod

##Build and Run Springboot App
spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name?serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
server.port=8080
