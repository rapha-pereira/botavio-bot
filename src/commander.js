function doPost(e) {
  // Get Botavio queue to wait for any other executions in progress
  const queue = new BotavioRequestsQueue();

  if (queue.isFreeQueue()) {
    const botavio = new Botavio();
    const requestHandler = new WebhookHandler(e);

    const response = requestHandler.handleWebhook()

    switch (response.command) {
      case '/vaiteraula':
        botavio.sendMessage(
          response.data.chatId,
          CALENDAR_RESPONSE_MESSAGE(response.data.username, response.report)
        )

      case '/validacao':
        response.report.forEach(x => {
          botavio.sendMessage(
            response.data.chatId,
            String(
              "*Nome completo: *" + x[1]
              + "\n*Data do pedido: *" + x[0]
              + "\n*Curso: *" + x[2]
              + "\n*Solicitação: *" + x[4]
              + "\n*Matéria a ser validada: *" + x[5]
              + "\n*Status da solicitação: *" + x[8]
            )
          )
        });
      }

    queue.releaseQueue()
  }
  else{
    console.log("fail")
  }
}

