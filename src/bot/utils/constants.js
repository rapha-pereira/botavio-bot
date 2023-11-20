// Reports specifics constants
const REPORTS__CALENDAR_SS = SpreadsheetApp.openById(
  "1NFmwUF8YNz8Xph58AyMweLKYMA-PEQnaGPUKJg_GjZo"
);
const REPORTS__CALENDAR_SHEET = REPORTS__CALENDAR_SS.getSheetByName("db");
const REPORTS__CALENDAR_HEX_MAP = {
  "#ffffff": "Aula normal.", // dias normais.
  "#cccccc": "Dia de fazer nada.", // final de semana
  "#000000": "Aulas suspensas. BORA BEBERRR!.", // atividades suspensas (?) (novo - 2023)
  "#0000ff": "Inicio ou término da desgraça.", // início ou fim do semestre.
  "#00b0f0": "Aula normal.", // início ou fim do semestre (E.M)
  "#9900ff": "Aula normal.", // início ou fim do semestre (SISU)
  "#00ffff": "FÉRIAS PORRAAAAA, VAMOO!!!", // férias.
  "#ff0000": "BORA BEBERRR!", // feriado.
  "#ff950e": "BORA BEBERRR! ²", // recesso.
  "#ffff99": "Sábado do inferno.", // sábado letivo
  "#ffffcc": "Sábado do inferno.", // sábado letivo 2 (cores da planilha n estão padronizadas)
  "#ffd966": "Aula normal.", // sábado letivo (E.M)
  "#ff00ff": "FÉRIAS PORRAAAAA, VAMOO!!!", // at. pedag./admin.
  "#ffd320": "Não sei oq era essa cor, acho que aula normal.", // dia não letivo (?)
  "#a64d79": "Aula normal.", // sepei em joinville (?)
};
const REPORTS__CALENDAR_MONTH_INT_TO_STR = {
  1.0: "JANEIRO",
  2.0: "FEVEREIRO",
  3.0: "MARÇO",
  4.0: "ABRIL",
  5.0: "MAIO",
  6.0: "JUNHO",
  7.0: "JULHO",
  8.0: "AGOSTO",
  9.0: "SETEMBRO",
  10.0: "OUTUBRO",
  11.0: "NOVEMBRO",
  12.0: "DEZEMBRO",
};
const REPORTS__CALENDAR_MONTH_CELLS_RANGE = {
  JANEIRO: "B1:AF1",
  FEVEREIRO: "B2:AC2",
  MARÇO: "B3:AF3",
  ABRIL: "B4:AE4",
  MAIO: "B5:AF5",
  JUNHO: "B6:AE6",
  JULHO: "B7:AF7",
  AGOSTO: "B8:AF8",
  SETEMBRO: "B9:AE9",
  OUTUBRO: "B10:AF10",
  NOVEMBRO: "B11:AE11",
  DEZEMBRO: "B12:AF12",
};

const REPORTS__REQUEST_VALIDATION_SS_ID =
  "1c0-1pS8WricWe8NZl7_kY5IwNiNai4350q2ljm5SI-c";
const REPORTS__REQUEST_VALIDATION_SHEET_NAME = "Visualização";
const REPORTS__REQUEST_VALIDATION_TIMESTAMP_COL_NAME = "Carimbo de data/hora";

// Botavio specifics constants
const BOT_TOKEN =
  PropertiesService.getScriptProperties().getProperty("BOT_TOKEN");
const BOT_URL = "https://api.telegram.org/bot" + BOT_TOKEN + "/";

const HELP_MESSAGE =
  "Olá, *senhores*. \nMeus comandos são: /validacao, /vaiteraula e /help." +
  "\n\n- O comando /validacao precisa ser passado como: *nome, data* ou *nome* (sem filtro de data)." +
  "\n- O comando /vaiteraula não precisa de nenhum campo." +
  "\n- O comando /help mostra essa mensagem." +
  "\n\n_Eu retornarei um erro caso o comando de validação seja passado sem o filtro de nome, pela grande quantidade de dados que terei que buscar._";


const CALENDAR_RESPONSE_MESSAGE = (a, b) => String(`@${a}, ${b}`);
const REQUEST_VALIDATION_RESPONSE_MESSAGE = (a, b, c, d, e, f) =>
  String(
    `*Nome completo: *${a}
    \n*Data do pedido: *${b}
    \n*Curso: *${c}
    \n*Solicitação: *${d}
    \n*Matéria a ser validada: *${e}
    \n*Status da solicitação: *${f}`
  );
const REQUEST_RESPONSE_TOO_LARGE_MESSAGE =
  "Fala tu!\nOs dados solicitados são muito grandes, por isso, segue em anexo os dados em um arquivo txt.";
const REQUEST_UNKNOWN_ERROR_MESSAGE =
  "Fala tu!\nOcorreu um erro desconhecido, por favor, tente novamente mais tarde.";
