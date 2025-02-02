const express=require("express")
const cors=require("cors")
const app=express();
const router = require("./routes/index")
app.use(cors());
app.use(express.json())

app.use('/api/v1', router); 
app.listen(3000, () => { console.log(`Server is running on port 3000`); });