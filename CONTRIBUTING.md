# Contributing to BotavioBot project <img src="https://i.ibb.co/pXhChFY/151ac49a-3151-432c-9e3b-5f6e02108afc.png" width="50">

Thank you for considering contributing to BotavioBot!

To contribute, there is a relatively long tutorial. But once done, it ensures continuous and trouble-free contributions to BotavioBot.

For any queries or assistance, feel free to create an issue on the GitHub repo.

## Setup

**1. Fork the Repository**

- Click on the "Fork" button at the top-right corner of the [BotavioBot repository](https://github.com/rapha-pereira/BotavioBot/) to create your fork.

**2. Access the Repository via Command Line**

- Open Terminal or CMD (Windows).
- Use `git clone` followed by your forked repository's URL to clone it to your local machine.

**3. Install Node.js and project dependencies**

1. Install [Node.js](https://nodejs.org/en/download) if not installed yet.

2. Then access the cloned repo and install deps:
```
   cd BotavioBot
   npm ci
```

**4. Enable Google Apps Script API**

- Ensure Google Apps Script API is enabled in your Google Cloud Console. [Click on this to do it.](https://script.google.com/home/usersettings)

**5. Logging into Clasp and Creating Apps Script Project**

- Log into Clasp with your personal account using the command line. [See Clasp docs for how to do it.](https://developers.google.com/apps-script/guides/clasp)
- Create an Apps Script project within the cloned repository using Clasp or using the UI by pushing the repository to the project.

**6. Create a Telegram Bot**

- Go to the Telegram [BotFather](https://telegram.me/BotFather) and initiate a conversation. Follow the instructions to create a new bot and obtain your bot token.

**7. Add Bot Token to Script Properties**

- In the Google Apps Script project editor, navigate to **_Resources > Script Properties_**. Add a new property named **BOT_TOKEN** and paste your **bot token** into the value field.

## Deploying BotavioBot to Google Apps Script

**1. Deploy as WebApp**

- In the Google Apps Script project editor, go to **_Publish > Deploy_** as web app.
- Choose `"Current project's version"` and select `"Execute as me"`, and set access to `"Anyone"`. Click `"Deploy"`.

**2. Obtain WebApp URL**

- Copy the web app URL provided in the deployment confirmation dialog. This URL will be used to set the Telegram bot webhook.

**3. Update repository `package.json` and `.clasp-dev.json` for simple/auto deploy**

- In the Google Apps Script project editor, go to **_Publish > Manage Deploys_**.
- On the active deploy, copy the code provided under **_Deployment code_**, save it somewhere.
- In the Google Apps Script project editor, go to the left tab and go to **_Project settings_**.
- On the IDs section, copy the code provided under **_Script code_**, save it somewhere.
- Go to your BotavioBot repository created in the **setup** part, open `package.json` and change:
```
  "scripts": {
    "deploy_dev": "bash ./prepare-deploy.sh dev && npx clasp push -f && npx clasp deploy -i YOUR DEPLOYMENT CODE -d \"Development\"",
```
- Now open `.clasp-dev.json` and change:
```
{
  "scriptId": "YOUR SCRIPT CODE",
```
> This is useful because you can deploy your bot easily with a command in the terminal (``npm deploy_dev``)

## Setting Telegram Bot Webhook

**1. Set Webhook URL**

- All you have to do is to call the setWebHook method in the Telegram Bot API via the following url:
https://api.telegram.org/bot{my_bot_token}/setWebhook?url={url_to_send_updates_to}

**2. Verify Webhook**

- Send a supported command, such as /help, to your Telegram bot. If the bot responds, the webhook has been successfully set up.

## Coding Style

We adhere to the [Prettier JavaScript Style Guide](https://prettier.io/docs/en/).
