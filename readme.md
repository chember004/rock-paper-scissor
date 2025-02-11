# Rock-Paper-Scissor Laravel11 & Nextjs15
Starter
## Local Installation
Install Docker Windows first. https://docs.docker.com/desktop/setup/install/windows-install/

## Docker Build
```
docker-compose up --build -d
```
Enjoy
## Docker Compose
Run service
```
docker-compose up -d
```
Stop service
```
docker-compose down
```
For Frontend
# http://localhost:3000/
For Backend
# http://localhost:8000/
__________________________________________________________
# Instructions
Items => selections to play. You can add more items with their weaknesses and strengths.
Ex: Metal, Leaves, Plastic, & etc.

Add Player => Press the button to add another player to simulate.
Delete all players => Delete all players if you are already bored.
Player (n-1) => Each player can select any of the items to play and simulate. Can also be random play.
![image](https://github.com/user-attachments/assets/8b537d69-aae1-4d04-a3f8-7a1015ad5351)


----------------------------------------------------------
# Tech Stack and Why It's Used:

## Next.js
Why: A modern React framework that simplifies building interactive, fast, and optimized web apps. It’s overkill for basic static apps, but it allows flexibility if the game expands (e.g., multiplayer or leaderboard features).

## shadcn/ui
Why: Provides pre-styled, accessible, and customizable components, speeding up UI development and ensuring a clean design without needing to style from scratch.

## Laravel
Why Laravel: Ideal for backend management if you plan to scale the game later (e.g., storing leaderboards or player profiles).

## React Hook Form
Why: Handles form inputs (e.g., player name input or settings) with minimal re-renders, improving performance and simplifying state management for forms.

## Zod
Why: Ensures safe and reliable validation of user inputs and API payloads, preventing errors and simplifying form validation.
This stack balances simplicity for now while allowing scalability and maintainability for potential future features.
