
Steps to Run on local machine:

- 1: pull or clone the project
- 2: cd gallery-pro
- 3: npm i 
- 4: npm start

for testing just run => npm run test

Explanation:

- Pagination is created in separated file - singly responsible which makes it reusable in other components and also easier to test.
- Used localstorage for persisting favorites photos,which retrieves the data in constant time.
