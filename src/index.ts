import app from "./app.js";

const port = process.env.PORT ?? "8000";

app.listen(port, () => `Listening on port ${port}`);
