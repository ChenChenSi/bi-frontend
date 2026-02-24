# GitHub Setup and Push Guide

Since you are new to GitHub, follow these steps to configure your local Git, connect it to your GitHub account, and push your code.

## 1. Configure Git Identity
First, tell Git who you are. This information will appear in your commit history.
Open your terminal (PowerShell) and run:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```
*Replace "Your Name" and "your_email@example.com" with your actual GitHub username and email.*

## 2. Commit Your Code
We have already initialized the repository and staged the files. Now, save your changes:

```powershell
git commit -m "Initial commit"
```

## 3. Connect to GitHub (Recommended: SSH)
Using SSH keys is the most secure and convenient way to connect.

### Step 3.1: Generate a new SSH key
Run the following command (press Enter to accept defaults):
```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```
*Replace the email with your GitHub email.*

### Step 3.2: Copy the SSH key
Display your public key and copy it:
```powershell
cat ~/.ssh/id_ed25519.pub
```
*Select the output (starts with `ssh-ed25519`), right-click to copy.*

### Step 3.3: Add Key to GitHub
1.  Log in to [GitHub.com](https://github.com).
2.  Click your profile photo (top right) -> **Settings**.
3.  In the left sidebar, click **SSH and GPG keys**.
4.  Click **New SSH key**.
5.  **Title**: Give it a name (e.g., "My Laptop").
6.  **Key**: Paste the key you copied.
7.  Click **Add SSH key**.

## 4. Create a Repository on GitHub
1.  Click the **+** icon (top right) -> **New repository**.
2.  **Repository name**: `bi-frontend` (or any name you prefer).
3.  **Description**: "BI Reporting System Frontend".
4.  **Public/Private**: Choose your preference.
5.  **Initialize this repository with**: Leave all unchecked (we already have code).
6.  Click **Create repository**.

## 5. Push Your Code
Once the repository is created, GitHub will show you a page with setup commands. Look for the section **"…or push an existing repository from the command line"**.

Run these commands in your terminal:

```powershell
# Link your local repo to the remote GitHub repo
# Replace 'YOUR_USERNAME' with your actual GitHub username
git remote add origin git@github.com:YOUR_USERNAME/bi-frontend.git

# Rename the default branch to 'main'
git branch -M main

# Push your code to GitHub
git push -u origin main
```

## Future Updates
When you make changes in the future:
1.  `git add .`
2.  `git commit -m "Description of changes"`
3.  `git push`
