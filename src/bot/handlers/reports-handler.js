/**
 * Processes a Telegram message and calls the appropriate handler based on the command.
*/
class ReportsHandler {
    constructor() {}

    redirectLessonOfDay() {
        const lessonReport = new LessonOfDayReport();
        return lessonReport.report()
    }

    redirectValidations(messageArgs) {
        const dateRange = messageArgs.pop();
        const name = messageArgs.join(' ').replace(",", "");

        const validationReport = new ValidationReport();
        return validationReport.report(dateRange, name);
    }
}