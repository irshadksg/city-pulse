# City Pulse – Local Events Explorer

A demo event discovery mobile application built using **Expo (React Native)** with modern architecture, async storage-based user management, and RTL support. Developed as part of a technical assessment project.

---

## 🚀 Features

- Search events by **keyword + city** using the Ticketmaster API
- Event detail view with full information
- Mark/unmark **favorite events**
- Toggle between **LTR and RTL layout**
- Local **user sign up & login** using AsyncStorage
- File-based routing using `expo-router`
- UI built with **React Native Paper**
- Type-safe hooks and modular business logic

---

## 📁 Project Structure

```bash
app/
├── (auth)/           # Login, Signup pages
├── (tabs)/           # Home(Events), Event Details,Profile with bottom tabs
├── _layout.tsx       # Root navigation layout
components/           # Reusable UI components
hooks/                # Custom business logic hooks
utils/                # Storage and helpers
configs/              # Paper-based theming, tanstack query client
constants/            # Global color tokens
```

---

## 📦 Tech Stack

- **React Native + Expo**
- **React Native Paper** – UI components & theming
- **Expo Router** – file-based navigation
- **AsyncStorage** – local user and favorites storage
- **TypeScript** – static typing and interfaces
- **i18n + RTL Support** – layout direction toggle (English ↔ Arabic layout)
- **Ticketmaster API** – external event data source
- **Axios** – to fetch data from ticketmaster
- **Tanstack Reqact Query** – To handle fetch data

---

## 🧠 Assumptions

- Only **one user** is stored via AsyncStorage at a time — signing up a new user **overwrites** the previous one.
- No backend server is used. All auth is **mocked locally**.
- Biometric login is **not implemented**.
- RTL support is implemented **at layout level**, but **no reusable RTL-aware components** (like `AppText`) were created. That could be an improvement area for production scale.

---

## 🛠 Getting Started

### 1. Install dependencies

```bash
yarn install
```

### 2. .env

```bash
add .env file at the root
EXPO_PUBLIC_TICKETMASTER_API_KEY= "ticketmaster-api-key"
```

### 3. Start the development server

```bash
yarn start
```

You'll be able to open the app in:

- **Expo Go** (on your mobile device)
- **iOS Simulator** / **Android Emulator**
- **Development builds** (for biometric, maps, etc. if implemented later)

## 📷 Screens Overview

- **Login & Signup**
- **Home tab**: Search + list events + event details
- **Profile tab**: Display saved user

---

## 📈 Potential Improvements

- Add **Firebase** for scalable auth and user management
- Store **multiple users** or use Firestore
- Build RTL-aware custom components like `AppText`, `AppView`
- Add **unit testing** with Jest + RTL
- Implement **biometric login** with `expo-local-authentication`

---

## 🧠 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Expo Router](https://expo.github.io/router/docs)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [Ticketmaster Discovery API](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/)

---

## 📸 Screenshots / Demo

<h3 align="center">🏠 Home Screens</h3>
<div align="center">
  <img src="https://res.cloudinary.com/djxmd6rso/image/upload/v1752772340/IMG_7100_2_fybgu9.png" alt="Home Page" width="200"/>
  <img src="https://res.cloudinary.com/djxmd6rso/image/upload/v1752772174/IMG_7103_2_m42o6d.png" alt="Home Page Search" width="200"/>
  <img src="https://res.cloudinary.com/djxmd6rso/image/upload/v1752772228/IMG_7102_2_fb2npj.png" alt="Home Page RTL" width="200"/>
</div>

<br/>

<h3 align="center">🎟️ Event Detail Screens</h3>
<div align="center">
  <img src="https://res.cloudinary.com/djxmd6rso/image/upload/v1752772106/IMG_7104_2_okmwmf.png" alt="Event Details" width="200"/>
  <img src="https://res.cloudinary.com/djxmd6rso/image/upload/v1752771872/IMG_7110_2_ra3ceg.png" alt="Event Detail RTL" width="200"/>
  <img src="https://res.cloudinary.com/djxmd6rso/image/upload/v1752771968/IMG_7105_2_jtmbe4.png" alt="Event Detail Bottom Page" width="200"/>
</div>
