# 💼 JobBoard UI – React Job Application Portal

A modern and responsive job listing application built with **React**, **TypeScript**, **Tailwind CSS**, and **React Hook Form**. Users can browse job cards, view detailed job descriptions, and submit applications via a modal form. Application status is stored in 
`localStorage`.
## 🛠 Setup Instructions

Follow the steps below to run the project locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/Mohtoto/pagination
   cd pagination


2. **Install dependencies**

    ```bash
    npm install
   ```
3. **Start the development server**

   ```bash
   npm run dev
   ```
## 🚀 Features

- 🔍 Job Listings Grid UI (like Dribbble/LinkedIn)
- 📄 View Job Details in a Modal
- 📝 Submit Job Applications with Validation
- 🌐 Data fetched via `axios` from public job API
- 💅 Styled with Tailwind CSS

---


## 🛠 Tech Stack

- **React**
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form**
- **Yup** (form validation)
- **Axios** (data fetching)
- **localStorage** (simple state persistence)

---


## 🧩 Folder Structure

```bash
src/
│
├── components/
│   ├── JobList.tsx           # Job cards
│   ├── JobDetails.tsx        # Detailed modal for job
│   └── ApplicationsModal.tsx # Application form modal
│
├── App.tsx                   # Main UI container
└── index.tsx                 # Entry point
