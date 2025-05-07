# QLDA_22NH12_G6_TodoTeam - Git Flow Guide for Project

## 1. Clone Repository

First, you need to clone the repository to your machine using the following command:
```sh
  git clone https://github.com/thanhdeptrai157/QLDA_22NH12_G6_TodoTeam.git
```
After cloning, navigate into the project directory:
```sh
  cd <QLDA_22NH12_G6_TodoTeam>
```

## 2. Add `.env` File

After cloning, create a `.env.local` file to configure environment variables. This file should not be committed to Git.

Example content for `.env.local` file:
```
YOUR_API_URL = your_url
```
Ensure that `.gitignore` includes the following line to prevent committing this file:
```
.env.local
```

## 3. Git Branching Flow

### 3.1. Main Branches
- `main`: Contains stable code, only merged after thorough testing.
- `develop`: The main development branch, containing the latest code changes.

### 3.2. Development Branches
Branches are created from `develop` using the following naming conventions:
- **New features**: `feature/<feature-name>` (e.g., `feature/ui-homepage`)
- **Bug fixes**: `fix/<bug-description>` (e.g., `fix/login-bug`)
- **Code refactoring**: `refactor/<description>` (e.g., `refactor/api-structure`)
- **Content updates**: `content/<description>` (e.g., `content/update-data`)

### 3.3. Creating a New Branch
To create a new branch from `develop`, use the following command:
```sh
  git checkout develop
  git pull origin develop
  git checkout -b <branch-name>
```
After making changes, push the branch to remote:
```sh
  git push origin <branch-name>
```

## 4. Commit Guidelines

### 4.1. Commit Message Structure
```
[Type] Short description

- Detailed description (if needed)
- List of important changes
```

### 4.2. Commit Types
- `feat`: New feature (e.g., `feat: Add homepage UI`)
- `fix`: Bug fix (e.g., `fix: Fix login issue`)
- `refactor`: Code refactoring (e.g., `refactor: Improve API structure`)
- `style`: UI/CSS changes only (e.g., `style: Update color scheme`)
- `docs`: Documentation updates (e.g., `docs: Add API usage guide`)
- `chore`: Maintenance tasks (e.g., `chore: Update .gitignore file`)

### 4.3. Commit Example
```sh
git commit -m "feat: Add detail page"
```

## 5. Creating a Pull Request (PR)
After completing a feature or bug fix, create a PR to `develop`:
1. Push code to remote.
2. Go to GitHub
3. Create a Pull Request from your branch into `develop`.
4. Add a detailed description and tag reviewers.

## 6. Keeping Code Up-to-Date
Always update your branch with the latest `develop` code before working:
```sh
git checkout develop
git pull origin develop
git checkout <branch-name>
git merge develop
```
If there are conflicts, resolve them before proceeding.


