# KachaPrice - Daily Price Tracker for Local Markets

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tech Stack](https://img.shields.io/badge/MERN-Stack-blue?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

**KachaPrice** is a full-stack MERN application designed to provide users with up-to-date local market prices for essential items. The platform allows users to compare prices across different markets, track trends, and make informed purchasing decisions. It features a role-based system for Users, Vendors, and Admins, creating a dynamic and interactive community-driven marketplace.

**Live Link:** [KachaPrice](https://kachaprice.netlify.app/)  
**Server-Side Repo:** [Server site](https://github.com/K-emon22/KachaPrice-Full-Stack-Project-Backendd.git)

---

## 🚀 Key Features

- **Role-Based Dashboards:** Custom dashboards for Users, Vendors, and Admins, each with tailored functionalities.
- **JWT Authentication:** Secure user authentication and session management using JSON Web Tokens, with social login support via Google.
- **Dynamic Product Listings:** Vendors can add and manage daily market prices, which are then reviewed and approved by an Admin. Users can view, filter, and sort all approved products.
- **Interactive Price Comparison:** Users can view historical price data and compare current prices with previous dates using interactive charts powered by **Recharts**.
- **User Watchlist & Orders:** Registered users can add products to a personal watchlist for easy tracking and view their order history.
- **Review and Rating System:** Users can leave star ratings and comments on products based on their real-world market experience.
- **Vendor Advertisement System:** Vendors can submit advertisements, which are displayed in a carousel on the homepage after admin approval.
- **Stripe Integration:** Secure payment processing for product purchases or advertisement placements.
- **Advanced Admin Controls:** Admins have full control over the platform, including user management, product approval/rejection (with feedback), and advertisement management.
- **Fully Responsive Design:** The UI is beautifully crafted with **Tailwind CSS** and **DaisyUI**, ensuring a seamless experience on mobile, tablet, and desktop devices.
- **Smooth Animations:** Engaging user experience with smooth animations implemented using **Framer Motion**.

---

## 🛠️ Technology & Packages Used

This project is built on the MERN stack and utilizes a modern set of tools and libraries to deliver a high-quality user experience.

### Core Technologies

- **Frontend:** React, Vite
- **Styling:** Tailwind CSS, DaisyUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase

### Key npm Packages

| Package                  | Version | Purpose                                              |
| ------------------------ | ------- | ---------------------------------------------------- |
| **`react`** | 19.1.0  | Core library for building the user interface.        |
| **`react-router`** | 7.6.3   | For client-side routing and navigation.              |
| **`tailwindcss`** | 4.1.11  | Utility-first CSS framework for styling.             |
| **`daisyui`** | 5.0.46  | Component library for Tailwind CSS.                  |
| **`@tanstack/react-query`** | 5.83.0  | For data fetching, caching, and state management.    |
| **`axios`** | 1.10.0  | For making HTTP requests to the backend API.         |
| **`firebase`** | 11.10.0 | For user authentication (including Google social login). |
| **`framer-motion`** | 12.23.5 | For creating fluid animations and transitions.       |
| **`swiper`** | 11.2.10 | For creating touch-friendly sliders and carousels.   |
| **`recharts`** | 3.1.0   | For creating interactive and responsive charts.      |
| **`@stripe/react-stripe-js`** | 3.7.0   | For integrating the Stripe payment gateway.      |
| **`react-hook-form`** | 7.60.0  | For efficient and powerful form handling.            |
| **`react-icons`** | 5.5.0   | For including a wide variety of icons.               |
| **`sweetalert2`** | 11.22.2 | For creating beautiful and responsive alert modals.  |
| **`react-toastify`** | 11.0.5  | For displaying non-blocking notifications.           |
| **`react-datepicker`** | 8.4.0   | For an easy-to-use date picker component.            |