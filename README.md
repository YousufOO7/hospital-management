# 🏥 Smart Hospital Management System with AI Chatbot

## 📌 Project Overview

Smart Hospital Management System is an AI-powered web application that helps users find the most suitable doctor based on their health problems through an intelligent chatbot.

In many cases, patients need to call hospital hotlines to ask which doctor they should consult. Sometimes it becomes difficult to clearly explain the problem over the phone, and the suggestion may not always be accurate.

This project solves that problem by introducing an AI chatbot that communicates with users, understands their symptoms, asks follow-up questions like a real doctor, and finally suggests appropriate doctors from the hospital database.

The chatbot supports **Bangla, English, and Banglish**, making it easier for users to communicate naturally.

---

## 🎯 Purpose of the Project

The main purpose of this project is to simplify the process of finding the right doctor.

Instead of calling hospital hotlines, users can:

- Describe their health problems directly to the AI chatbot
- Answer follow-up questions asked by the chatbot
- Receive suggestions for suitable doctors based on their symptoms

This system helps users save time and reduces confusion when choosing the right medical specialist.

---

## 🤖 AI Chatbot Workflow

The chatbot behaves like an initial doctor consultation.

### Process

1. User sends a message describing their health problem  
2. Chatbot analyzes the message using **AI (Groq AI)**  
3. Chatbot asks follow-up questions such as:
   - Age
   - How long the problem exists
   - Additional symptoms

4. AI processes the collected information  
5. The system searches the **MongoDB database** for relevant doctors  
6. Chatbot suggests appropriate doctors to the user

---

## 🌐 Live Project

🔗 Live Demo:  
https://hospital-management-vert-nu.vercel.app/

---

## ⚙️ Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS

### Backend
- Node.js
- MongoDB

### AI Integration
- Groq AI

### Deployment
- Vercel

---

## ✨ Features

### 🤖 AI Health Consultation Chatbot
- Conversational chatbot that interacts like a human
- Understands Bangla, English, and Banglish
- Asks follow-up questions similar to a real doctor
- Suggests doctors based on symptoms

### 🩺 Doctor Recommendation System
- Suggests doctors based on user health problems
- Fetches doctor information from MongoDB database

### 🌍 Multilingual Support
The chatbot can understand:

- Bangla
- English
- Banglish

Example inputs:

- "amar matha betha"
- "I have headache"
- "amar stomach pain hocche"

---

## 🗄️ Database

The system uses **MongoDB** to store:

- Doctor information
- Doctor specializations
- Availability
- Other hospital-related data

The chatbot analyzes user symptoms and matches them with doctor specialties stored in the database.

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository
### Make sure you have a mongoDB with doctor data and Groq AI .env

```bash
git clone https://github.com/YousufOO7/hospital-management
