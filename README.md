# 🎉 Evently - Event Management Platform

Welcome to Evently, your comprehensive solution for event management and ticket handling! 🌟

## 🚀 Features

- 👥 User Authentication & Management
- 📅 Event Creation & Management
- 🎫 Ticket Booking & Verification
- 📱 Dashboard for Admins & Organizers
- 📨 OTP Verification System

## 🔑 Default Admin Access

- Email: admin@evently.com
- Password: admin

# 🛠 Installation & Setup

Installation Steps

Clone the repository:

```
git clone https://github.com/abdelhadia72/evently-app.git
cd evently-app
```

Install dependencies:

```
npm install
```

Start the server:

```
npm run dev
```

Open `http://localhost:3000` in your browser and login

## 📍 Main Routes

### Authentication Routes 🔐

- Login: `/auth/login`
- Register: `/auth/register`
- Password Reset: `/auth/request-password-reset`
- Verify Account (OTP): `/auth/verify`

### Dashboard Routes 📊

- Main Dashboard: `/dashboard`
- Events Management: `/dashboard/events`
- Users Management: `/dashboard/users`
- Overview: `/tickets`

### Event Routes 🎪

- Event List: `/dashboard/events`
- Create Event: `/dashboard/events/create`
- Event Details: `/{id}`
- Update Event: `/dashboard/events/{id}`

### Ticket Management 🎫

- List All Tickets: `/tickets`
- User Tickets: `/auth/tickets`
- Event Tickets: `/events/{eventId}/tickets`
- Book Ticket: `/events/{eventId}/tickets`
- Cancel Ticket: `/events/{eventId}/tickets`
- Verify Ticket: `/tickets/{ticketId}/verify`
- Check-in: `/check-in/tickets`

## 👥 User Roles

- Admin: Full system access
- Organizer: Event management capabilities
- User: Basic ticket booking and viewing

## 🔍 API Endpoints

### Events API

- Search Events: `/events/search`
- CRUD Operations: Standard endpoints for event management

### Users API

- User Management: Complete CRUD operations
- Profile Management: `/me` endpoint for user profile

## 🛠 Getting Started

1. Clone the repository
2. Install dependencies
3. Configure your environment variables
4. Run the application
5. Access the dashboard using the admin credentials

## 🔐 Security Features

- Role-based access control
- Protected routes
- OTP verification system
- Secure password reset flow

## 💡 Additional Features

- File uploads support
- Post management system
- User verification system
- Ticket verification system
