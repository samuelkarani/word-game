### setup

1. setup `.env` file with GCP api key as `GOOGLE_API_KEY` and firestore database url as `DATABASE_URL`
1. setup `.google` file from GCP service account file
1. run `npm install` to install dependencies

### scripts

- `npm dev` - running locally
- `npm build` - compiling typescript
- `npm start` - executing compiled code

### approach

- Initially served word requests using the words array read from verbs.txt as my in-memory database.
- Later moved words array into firestore database and added difficulty scores for each word.
- Now fetching words based on the current user score parameter passed from the client.
- Words are filtered based on the score parameter and a random word is selected from the filtered subset.

### architecture

- endpoint `/word` provides a french word and its english translation.
- endpoint `/success` and `/failure` update success and failure counts for the word parameter.
- decided to use firestore database because of recent familiarity and the ability to filter, order and limit data.
- data model is a map with keys/values i.e. `{ word: string, score: number, success: number, failure: number}`
- difficulty scores for each word is based on the general length of the word.

### improvement

1. testing and error handling e.g. 400 & 500 errors
2. decouple database initialization from server initialization
3. employ more efficient word fetching
4. setup strict code linting
5. perform security measures e.g. secure cors origins & request origins
6. better score computation (considering success and failure analytics)
7. could be moved to nextjs architecture for better performance & maintainability
8. configure dev and prod environment variables then deploy

### time

total time spent was about 3-4 hours
