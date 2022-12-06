## Setup

`npm install && npm run start`

Depends on server at port 8080

## Approach

_There was ambiguity in "makes a mistake". I took it to mean mistaking a word and not a character._

Initially implemented as CSR app within 2-3 hours. Later moved word and translation requests to node/express server accessible via api. Total time spent about 4-5 hours.

## Improvement

1. add testing mode (lower winning and losing scores + show translation)
2. implement testing & explore edge cases
3. add error handling with visible messages
4. add loading states for requests
5. close confirmation or restoring game state when tab/window is closed
6. ~~secure secrets in environment variables~~
7. refactor into components e.g. App into 2 components
8. refactor into hooks e.g. useGame and useApp hooks
9. add css effects/animations
10. utilize better ui components e.g. replace window alert
11. deploy after setting api urls for dev & prod
12. performance tuning using useCallback, useMemo, React.memo etc.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
