# Qlik Variable and Group Manager

![Qlik Variable Group Manager Logo](Logo.png)

## Description

This application was born when managing multiple application with many variable each became difficult to manager and make changes to.  It aims to make it easier to manage Variables and Groups used within Qlik applications.

Initially, the application only managed variables, but soon I added Group management also (Cyclic and Drill).

Keeping variables external to your Qlikview script is a good way to keep things more manageable and maintainable.

QVGM (Qlik Variable and Group Manager) stores the data in JSON files and support multiple Qlik applications.  You can export your variable and groups in either JSON or XML format for import into your Qlik applications.

## NPM Scripts

- **electron-dev** - runs the app in dev mode

## Data Storage

All data is stored in JSON files in the `data` directory of the application.

- **qvwnames.json** - stores the applications (qvw files) that will be managed.
- **qvVariables.json** - variables for all the managed applications
- **qvGroups.json** - groups for all the managed applications 
- **qvwFields.json** - stores the fields for use in the Group manager.

## Tooling

The application is build with React and uses Redux for global storage.

