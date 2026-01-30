![My GitHub Banner](https://i.ibb.co.com/4gKXkjgF/Screenshot-2025-11-19-161129.png)
# 🐾 PetBond – Friendship Between Pets & Humans

🔗 **Live Website:** https://petbond-project.netlify.app/

PetBond is a modern pet marketplace web application where users can **buy, sell, and explore pet products and pets**, building a strong bond between pets and humans.

---

## 🚀 Features

- 🐶 Buy & Sell pet products and pets
- 🔐 Authentication (Login / Register required for full access)
- 🌗 Dark & Light Mode
- 🔍 Search pets & products easily
- 🗂 Category-based product listing
- 🛒 Order & cancel products
- ➕ Add, ✏️ Update & ❌ Delete own listings
- 📦 My Orders & My Listings dashboard
- 🎨 Modern UI with smooth animations

---

## 🧭 Navbar Overview

- **Left:** Website Logo  
- **Middle:** Navigation Routes  
- **Right:**  
  - Dark / Light Mode toggle  
  - Login & Register buttons  
  - User profile (after login)

⚠️ Full website access is available **only after login or registration**.

---

## 🏠 Home Page Overview

The Home page includes:

- 🔹 Responsive Navbar  
- 🎞 Three interactive banner sliders  
- 🐾 Pet & product information  
- 📂 Category-wise product display  
- ❤️ Pet care & responsibility section  
- 👥 People who serve pets showcase  
- 📌 Reusable Footer  

---

## 🐕 Pets & Supplies Page

- 🖼 Product cards with:
  - Image
  - Name
  - Short description
- 🔍 Search bar to find desired products
- 🔎 **Details Button** shows full product info
- 🛍 **Order Now** button opens a modal to confirm purchase

---

## ➕ Add Listing Page (Protected)

- Only accessible for logged-in users
- Users can:
  - Add pet or product for selling
  - Provide category, price, location & details

---

## 📋 My Listings Page (Protected)

- Displays all products added by the user
- Shows:
  - Product name
  - Category
  - Location
- Actions:
  - ✏️ Update product
  - ❌ Delete product

---

## 🛒 My Orders Page (Protected)

- Displays all ordered products
- Users can:
  - View full order details
  - ❌ Cancel orders if needed

---

## 🔐 Authentication & Security

- Firebase Authentication
- Protected Routes for:
  - Add Listing
  - My Listings
  - My Orders

---

## 🛠 Technologies Used

### Frontend
- React
- React Router
- Tailwind CSS
- DaisyUI
- React Icons

### Libraries & Tools
- Firebase
- AOS
- Swiper
- React Toastify
- SweetAlert2
- React Simple Typewriter
- Typewriter Effect

---

## 📦 Installation & Setup

```bash
git clone https://github.com/your-username/petbond-client.git
cd petbond-client
npm install
npm run dev
