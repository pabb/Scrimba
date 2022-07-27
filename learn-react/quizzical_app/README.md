# Quizzical quiz app

Based on the [Scrimba "Learn React"](https://scrimba.com/learn/learnreact) final project but developed from scratch.

# TODO

- If user is below the `<h1>` (e.g. on a mobile device), scroll them to the top of the screen (to see the win condition and Confetti, if they won)
- After submission, report Win/Loss in the `<h1>` and the number correct (e.g. '3/5')
- Fix issue with the "Check Answer" button appearing momentarily before the questions render
- Write tests/jest
  - Dummy data for testing win condition, to avoid needing to console log the correct answer
- Get rid of hard-coded 5 question limit and allow choosing a variable number of questions

# Potential future features

- Enable user to customize the categories and # of questions
    - Use OTDB API to generate a new URL with the selected categories
- Use a DB backend to track users and the number of games won
