import { app } from "./app.js";
import { connectDB } from "./utils/db.js";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port : http://localhost:${PORT}`);
  connectDB();
});
