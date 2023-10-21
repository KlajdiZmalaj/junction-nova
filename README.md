# Nova Junction Web - Frontend

## Installation & START

- Run docker containers `make upd`
- Enter into node shell `make shell`
- Install dependencies via node `npm i`
- Run NextJS development server `yarn dev`<br>
  _Please make sure to run yarn inside the node container._

## Development

- Run docker containers if stopped `make upd`
- Enter into node shell `make shell`
- Run NextJS development server `yarn dev`<br>
  _Please make sure to run yarn inside the node container._

## Project structure

- _./src/app_: nextjs routes
- _./src/assets_: assets and images
- _./src/hooks_: shared hooks
- _./src/containers_: router containers Home,Login ...
- _./src/contexts_: app state managment
- _./src/components_: shared ui components
- _./src/utils_: shared utilities
- _./src/models_: object models
- _./src/style_: styling
- _./src/theme_: PrimeTheme custom variables and more

Aliases have been configured in `compilerOptions.paths` section on the tsconfig.json file to simplify all the project
imports.

### Stack:

- NextJS + PrimeReact
- Tailwind - utility first css framework to build and maintain design system
- React Context API - to manage app state and api call
- Prettier - maintains same code formatting on the project (Configuration: https://prettier.io/docs/en/editors.html)

## Project description

With this project we can manage and view residential buildings and maintain everything on it. Starting from the buildings on the home page we can select the building and enter their floors. By selecting one floor from the 3d model of the building we can see all the appartaments on a 2d plan for each floor. Each appartament has its own data. By clicking one appartament we can edit/view data like : Name,Description,Status,Room contract,Residents and we can also have the posibility to connect and check room sensors (fire alarms, smoke sensors, power and more...)
