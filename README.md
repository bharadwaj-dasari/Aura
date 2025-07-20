# Aura

Aura is a platform designed to revolutionize blood donation management for hospitals and donors. It provides a seamless interface for tracking blood units, donor profiles, and optimizing blood supply management. The project aims to increase donation rates and make the blood donation process more efficient for healthcare facilities.

## Homepage

Visit the hosted site: [Aura Homepage](https://aura-sepia.vercel.app)

## Features

- **Donor Management:** Easily track and manage donor profiles and achievements.
- **Blood Unit Tracking:** Monitor blood supply levels, urgency badges, and blood type-specific details.
- **Hospital Interface:** Hospitals can partner with Aura to optimize blood supply management and streamline donation processes.
- **Authentication:** Secure login and registration for donors and hospital staff.
- **Filtering & Search:** Advanced filtering for blood units and donor information.
- **Responsive UI:** Mobile-friendly, modern interface with interactive components.
- **Contact & Social:** Built-in contact options and social links.
- **Achievements & Rewards:** Donors can earn badges and achievements for their contributions.
- **Urgency Indication:** Real-time urgency badges for blood unit requests (urgent, moderate, normal).
- **Blood Group Visualization:** Clear color-coded representation of blood groups and stock levels.
- **Privacy & Security:** User data is protected with secure authentication and modern security practices.
- **Admin Dashboard:** Hospitals and admins can view analytics, manage requests, and oversee blood inventory.
- **Donation History:** Donors can view their past donation history and upcoming opportunities.
- **Notifications:** Email and dashboard notifications for urgent requests, donation opportunities, and achievements.
- **Multi-Hospital Support:** Multiple hospitals can utilize Aura for independent supply chain management.
- **Accessibility:** Designed with accessibility and usability for all users in mind.
- **Custom Theming:** Personalize your interface with theme options.

## Tech Stack

- **Frontend:** JavaScript (React), CSS Modules, MUI, 
- **Backend:** Node.js, ExpressJs MySQL
- **Deployment:** Vercel

## Setup Instructions

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MySQL server

### 1. Clone the Repository

```bash
git clone https://github.com/bharadwaj-dasari/Aura.git
cd Aura
```

### 2. Install Dependencies

```bash
cd client
npm install
```

### 3. Setup the Database

Update the database credentials in `config/database.js` as needed:

```js
const dbConfig = {
  host: "localhost",
  user: "your_mysql_user",
  password: "your_mysql_password",
  // ...
};
```

The database setup script will create a database named `aura` if it does not exist.

### 4. Start the Application

```bash
npm start
```

### 5. Access the App

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contribution

Feel free to fork the repository and submit pull requests. All contributions are welcome!


## License

This project currently does not specify a license.

---

&copy; AuraHP. All rights reserved.
