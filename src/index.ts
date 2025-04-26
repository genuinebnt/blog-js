import app, { logger } from "./app.js";

const port = process.env.PORT ?? "8000";

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
