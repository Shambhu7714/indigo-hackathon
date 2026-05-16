# IndiGo — project layout

Application code lives under **`frontend/`** (React + Vite + Tailwind).

```
indigo/
├── README.md
├── .gitignore
└── frontend/
    ├── package.json
    ├── index.html
    ├── vite.config.ts
    ├── tsconfig*.json
    ├── public/
    └── src/
```

## Run the UI

```bash
cd frontend
npm install
npm run dev
```

Production build:

```bash
cd frontend
npm run build
```

You can also use **npm workspaces** from the repo root (see root `package.json`) to run scripts without changing directory.
# indigo-hackathon
