const SecurityChecker = {
    isTelegramWebhook: function (e) {
        const headers = e.parameter;
        const token = headers["X-Telegram-Bot-Api-Secret-Token"];
        if (token == WEBHOOK_SECRET_TOKEN) {
            return true;
        }
        else {
            return false;
        }
    },
};