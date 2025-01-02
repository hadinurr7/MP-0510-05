import app from "./app";
import { PORT } from "./config";

app.listen(PORT, () => {
  (`Server running on PORT: ${PORT}`);
}); 