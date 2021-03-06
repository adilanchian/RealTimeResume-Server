# RealTimeResume-Server

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  * [Config.json](#configjson)
  * [Ngrok](#ngrok)
  * [Running RealTimeResume-Server](#running-realtimeresume-server)
- [Azure Cloud](#azure-cloud)
- [Huge Thanks](#huge-thanks)
- [Questions](#questions)

## Introduction
Welcome to RealTimeResume! This is the server portion for the Angular component located @ https://github.com/adilanchian/RealTimeResume-Angular.
This is an attempt at creating a component that allows you to keep your resume up to date on any angular site by utilizing Github's webhook.
Using Azure, Github Pages, Node.js, and Pusher I was able to create a working version of this @ http://adilanchian.me/RealTimeResume
I will go through the technical stack and how to get started with RealTimeResume-Server!

## Getting Started
Setting up the server portion of this component is fairly straight forward. If you have not yet, please make sure you go through the Angular setup. It has certain keys that are needed on the server side.

### Config.json
This config file is what handles all your Pusher details. The first step of getting started is to go ahead and fill in these section with the proper values. Once that is complete, please make sure to rename `config.example.json` to `config.json`.

### Ngrok
Ngrok allows you to receive webhook events on your localhost without exposing your entire device.
This tool is what you will use to do local testing. The tool can be found here: https://ngrok.com/
Once you have setup ngrok, go ahead and add that to your webhook payload url.

### Running RealTimeResume-Server
Running this server is as easy as 1, 2, 3.
From command line, in the respective directory:

1. Start Ngrok: `./ngrok http 8080`
2. Download Dependencies: `npm install`
3. Run Server: `npm start`

After these three tasks you will have your node server up and running!

## Azure Cloud
The awesome part about this component is being able to host it in the cloud utilizing Azure's easy to use web app service. To host this app on Azure, please follow the tutorial here @ https://docs.microsoft.com/en-us/azure/app-service/containers/quickstart-nodejs

## Huge Thanks
I wanted to recognize a few libraries that really made this project come to life:
- Pusher (Realtime notification service) - https://pusher.com
- Mammoth.js (.docx to HTML converter) - https://github.com/mwilliamson/mammoth.js

## Questions
Thanks for checking out this project!
If you have any questions or concerns in regards to the server component please file a Github Issue in this repository.
If you have any questions or concerns about the Angular portion of this component, please
file a Github Issue in https://github.com/adilanchian/RealTimeResume-Angular
