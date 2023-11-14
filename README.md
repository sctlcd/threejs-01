# [threejs-01](https://threejs-01.web.app/)

<br />
<img src="https://github.com/sctlcd/threejs-01/blob/main/design/threejs-01-preview.png" alt="threejs-01" width="800">
<br />

---

# Table of Contents <a name="tableOfContents"></a>

1. [Introduction](#introduction)

2. [Run the project locally](#runLocally)

3. [Available Scripts](#availableScripts)

4. [Deployment](#deployment)

   - [Deployment – Run locally](#deploymentRunLocallydeploymentRunLocally)
   - [Deployment – Live website](#deploymentLiveWebsite)

5. [Credits](#credits)

   - [Media](#media)

---

## Introduction <a name="introduction"></a>

Creating ... using [Three.js](https://threejs.org/).

Back to [top](#tableOfContents)

---

## Run the project locally <a name="#runLocally"></a>

- Runs the app in the development mode.\
  Open http://localhost:5173 to view it in the browser.
  ```
  cd threejs-01
  npm i
  npm run dev
  ```

Back to [top](#tableOfContents)

---

## Available Scripts

In the project directory, you can run:

#### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

#### `npm run preview`

**Note: `vite preview` is intended for previewing the build locally and not meant as a production server**

Once you've built the app, you may test it locally by running
```
npm run build
npm run preview
```

The `vite preview` command will boot up a local static web server that serves the files from `dist` at `http://localhost:4173`. It's an easy way to check if the production build looks OK in your local environment.

You may configure the port of the server by passing the --port flag as an argument.
```
{
  "scripts": {
    "preview": "vite preview --port 8080"
  }
}
```

Now the `preview` command will launch the server at `http://localhost:8080`

Back to [top](#tableOfContents)

---

## Deployment <a name="#deployment"></a>

### Deployment – Run locally <a name="#deploymentRunLocally"></a>

1. Prerequisite:
   - Make sure [Node](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) are installed on your computer. You can download both at nodejs.org (NPM is included in your Node installation).
   - Please see `.nvmrc` file at the root of `threejs-01` repo.
   - Using nvm, a Node Version Manager is recommended as it helps you manage and switch between different Node versions with ease. It provides a command-line interface where you can install different versions with a single command, set a default, switch between them, etc.
2. In GitHub click on the repository nammed [threejs-01](https://github.com/sctlcd/threejs-01)
3. Clone the repository locally. Run

   ```
   git clone https://github.com/sctlcd/threejs-01.git
   ```

4. Install all modules listed as dependencies and devDependencies in package.json

   ```
   cd threejs-01
   npm i
   ```

   note: in this app

   - [three](https://www.npmjs.com/package/three) - **JavaScript 3D library**
   - [vite](https://vitejs.dev/) - **Development server with live reload capability for building fast and optimized web applications**
  

5. Runs the app in the development mode.
   Open http://localhost:5173 to view it in the browser.
   ```
   cd threejs-01
   npm run dev
   ```

Back to [top](#tableOfContents)

---

### Deployment - Live Website <a name="#deploymentLiveWebsite"></a>

[threejs-01](https://github.com/sctlcd/threejs-01) live website is currently deployed on []() using the `main` branch on GitHub. Once you have the project setup locally, you can proceed to deploy it remotely.

=> live link: https://threejs-01.web.app/

Back to [top](#tableOfContents)

---

## Credits <a name="credits"></a>

### Media <a name="media"></a>

- [favicon.ico]() - []() | copyright []()
- []() - []() | copyright []()

Back to [top](#tableOfContents)

---