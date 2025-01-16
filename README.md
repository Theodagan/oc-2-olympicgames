# Olympic Medals Application

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.3.

This app displays graphs representing medals won at the Olympic Games by different countries, based on a JSON file containing all the data.

---

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Available Scripts](#available-scripts)
4. [Project Structure](#project-structure)
5. [Contributing](#contributing)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Theodagan/oc-2-olympicgames.git
   cd olympic-medals
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or with Yarn
   yarn install
   ```

---

## Usage

### Start the Development Server

Run the application in development mode:

```bash
npm start
# or with Angular CLI
ng serve
```

By default, the application will be accessible at: [http://localhost:4200](http://localhost:4200)

### Build for Production

To generate an optimized production build:

```bash
npm run build
```

The output files will be placed in the `dist/` folder.

---

## Available Scripts

- **`npm start`**: Starts the development server.
- **`npm test`**: Runs unit tests via Karma.
- **`npm run build`**: Compiles the application for production.
- **`npm run lint`**: Checks the code using TSLint.
- **`npm run e2e`**: Runs end-to-end tests with Protractor.

---

## Project Structure

Here is an overview of the main project files:

```
OC-2-OLYMPICGAMES/           
|--public/            # Static files (formerly /assets)
|  |-- mock/
|  |   |-- olympic.json    # Olypimc games data
|--src/
|  |-- app/
|  |   |-- components/    # Angular components
|  |   |-- core/      # Angular services and data interfaces
|  |   |-- pages/  # Angular components acting as views
|  |
|  |-- index.html         # HTML entry point
|  |-- main.ts            # TypeScript entry point
```

---

## Contributing

Contributions are welcome! Here’s how you can help:

1. Fork this repository.
2. Create a branch for your feature: `git checkout -b feature/feature-name`.
3. Make clear and detailed commits.
4. Submit a pull request.
