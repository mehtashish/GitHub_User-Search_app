# GitHub User Search App

This project allows users to search for a GitHub username and retrieve detailed information about the account associated with that username, including profile details and repositories.

## Features
- Search for a GitHub username
- Retrieve information such as:
  - Profile details (name, bio, location, etc.)
  - Repositories (name, description, stars, forks, etc.)

## Project Structure
- `index.html`: Main HTML file for the project.
- `style.css`: CSS file for styling the application.
- `script.js`: JavaScript file that handles the API requests to GitHub and renders the user information.
- `appspec.yml`: AWS CodeDeploy configuration file for deploying the app.
- `buildspec.yml`: AWS CodeBuild configuration file for building the app.
- `scripts/`: Folder containing deployment scripts for setting up and starting the application.

## Technologies Used
- **HTML**, **CSS**, **JavaScript**: Frontend technologies to build the UI.
- **GitHub API**: Used to fetch user details.
- **AWS CodePipeline**, **AWS CodeBuild**, **AWS CodeDeploy**: For continuous integration and deployment (CI/CD).
- **EC2**, **S3**: AWS services used for hosting and deployment.

## Prerequisites
To run this project locally or deploy it, you will need:
- A GitHub account
- Web Browser (for running locally)
- AWS account (for deployment)
- Basic knowledge of HTML, CSS, and JavaScript

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/mehtashish/GitHub_User-Search_app.git
cd GitHub_User-Search_app
```
## 2. Running Locally

To run the application locally, simply open the `index.html` file in a browser. It will prompt you to enter a GitHub username, and the relevant account details will be displayed.

## 3. Deployment (Optional)

This project is set up for deployment using AWS services. To deploy it, follow these steps:

### Deploy to EC2 Instance

1. Ensure you have an EC2 instance running and an S3 bucket for storing the deployment files.
2. Use the following files:
   - **AppSpec.yml**: Defines the deployment instructions.
   - **Buildspec.yml**: Specifies the build steps for CodeBuild.
3. Push your changes to GitHub and trigger the AWS CodePipeline for automatic deployment.

## Usage

1. Open the application.
2. Enter the GitHub username in the input field.
3. Press the "Enter key" to get the details of the GitHub account.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
