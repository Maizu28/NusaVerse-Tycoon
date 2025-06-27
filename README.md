# Petani Klik

/nusiverse-tycoon
├── /client (Frontend - React.js)
│   ├── /public
│   │   └── index.html
│   ├── /src
│   │   ├── /assets
│   │   ├── /components (UI Reusable: Button, Navbar, etc.)
│   │   ├── /pages (Dashboard, Bank, Market, Profile, etc.)
│   │   ├── /services (API calls: authService, gameService)
│   │   ├── /context (Global state: UserContext)
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── /server (Backend - Node.js & Express.js)
│   ├── /config
│   │   ├── db.js          // Koneksi MongoDB
│   │   └── keys.js        // Variabel environment (.env)
│   │
│   ├── /controllers
│   │   ├── authController.js   // Logic untuk login, register
│   │   ├── userController.js   // Logic untuk profil, inventory
│   │   ├── gameController.js   // Logic untuk aksi profesi, crafting
│   │   ├── bankController.js   // Logic untuk setor, tarik
│   │   └── marketController.js // Logic untuk toko, trading, leaderboard
│   │
│   ├── /middlewares
│   │   └── authMiddleware.js // Middleware untuk proteksi route (JWT)
│   │
│   ├── /models
│   │   ├── userModel.js      // Skema Mongoose untuk User
│   │   ├── itemModel.js      // Skema Mongoose untuk Item
│   │   ├── shopModel.js      // Skema Mongoose untuk User Shop
│   │   └── logModel.js       // Skema Mongoose untuk Market Logs
│   │
│   ├── /routes
│   │   ├── authRoutes.js     // API endpoints: /api/auth/login
│   │   ├── userRoutes.js     // API endpoints: /api/users/profile
│   │   ├── gameRoutes.js     // API endpoints: /api/game/perform-action
│   │   └── marketRoutes.js   // API endpoints: /api/market/listings
│   │
│   ├── /jobs
│   │   └── marketPriceUpdater.js // Cron job untuk update harga pasar
│   │
│   ├── server.js             // Entry point backend
│   └── package.json
│
└── .gitignore