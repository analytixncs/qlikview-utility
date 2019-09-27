# Qlik Utility

## Description

This application aims to make it easier to manage Variables and Groups used within Qlik applications.

Keeping variables external to your Qlikview script is a good way to keep things more manageable and maintainable.

## NPM Scripts

- **electron-dev** - runs the app in dev mode

## Data Storage

All data is stored in JSON files in the `data` directory of the application.

- **qvwnames.json** - stores the applications (qvw files) that will be managed.
- **qvVariables.json** - variables for all the managed applications
- **qvGroups.json** - groups for all the managed applications 



## Tooling

The application is build with React and uses Redux for global storage.

