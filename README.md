# Online Exam System - Angular Frontend

## Overview

This repository contains the Angular frontend application for an Online Exam System. It provides a user-friendly interface for students to attempt exams, and for administrators/teachers to manage exams, questions, and users. The application is designed to be responsive and interactive, consuming RESTful APIs from a separate backend system.

## Key Features

*   **User Authentication & Authorization:** Secure login for different user roles (e.g., Student, Teacher, Admin).
*   **Exam Management:** Create, edit, view, and delete exams, including setting exam details and associating questions.
*   **Question Management:** Add, modify, and organize questions for various subjects and exams.
*   **Exam Attempt Functionality:** Students can browse available exams, attempt them, and view their scores.
*   **User Management:** Administrators can manage student and teacher accounts.
*   **Role-Based Access Control:** Different functionalities and views are accessible based on user roles.
*   **Responsive Design:** Optimized for various screen sizes, providing a seamless experience across desktop and mobile devices.
*   **Intuitive User Interface:** Built with Angular components and Bootstrap for a consistent and user-friendly experience.
*   **Error Handling:** Robust error handling and user feedback mechanisms.

## Technologies Used

*   **Frontend Framework:** Angular (v17.3.0)
*   **State Management:** RxJS (v7.8.0)
*   **UI Framework:** Bootstrap (v5.3.3)
*   **Authentication:** JWT (JSON Web Tokens) with `jwt-decode` library.
*   **Icons:** Font Awesome (v6.7.2)
*   **Alerts/Notifications:** SweetAlert2 (v11.6.13)
*   **HTTP Client:** Angular\`s `HttpClient` with custom interceptors for JWT and error handling.

## Technical Highlights

*   **Modular Architecture:** The application is organized into feature modules (e.g., `auth`, `exams`, `exam-attempt`, `users`), promoting code reusability and maintainability.
*   **Route Guards:** Implemented authentication and role-based guards (`check-permission.guard.ts`) to protect routes and control access based on user roles.
*   **HTTP Interceptors:** Used for automatically attaching JWT tokens to outgoing requests (`add-jwt-token.interceptor.ts`), checking token expiration (`check-expire.interceptor.ts`), and handling global error responses (`error.interceptor.ts`).
*   **Component-Based Design:** Follows Angular\`s component-based architecture for building reusable UI elements and managing application state.
*   **Data Models:** Clearly defined TypeScript interfaces and classes for data transfer objects (DTOs) and view models (`shared/models`).

## Key Use Cases

*   **Student:**
    *   Register and log in to the system.
    *   Browse available exams.
    *   Attempt online exams.
    *   View exam results and scores.
*   **Teacher:**
    *   Log in to the system.
    *   Create and manage exams (add/edit questions, set exam details).
    *   View student performance on exams.
*   **Administrator:**
    *   Log in to the system.
    *   Manage user accounts (add/edit students and teachers).
    *   Oversee all exams and questions.
    *   Monitor system activity and user roles.

## API Documentation

This Angular application interacts with a separate backend API. The documentation for the backend API would typically be found in its respective repository. This frontend consumes endpoints for:

*   **Authentication:** User login, token management.
*   **User Management:** Creating and managing student/teacher accounts.
*   **Exam Management:** CRUD operations for exams and questions.
*   **Exam Attempt:** Submitting answers, retrieving exam templates, fetching scores.

**Base API URL:** (This would typically be configured in the Angular environment files, e.g., `src/environments/environment.ts`)

For detailed request/response schemas, permissions, and other API-specific information, please refer to the backend API documentation.

