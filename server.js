const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const { json } = express;

require("dotenv").config();

//Configuration of openai
const config = new Configuration({
    apiKey:process.env.OPENAI_API_KEY
});

//Initialize openai
const openai = new OpenAIApi(config);


const app = express();
app.use(cors());
app.use(json());



app.post("/", async (req,res,next) => {
    try{
        //Get the prompt/inputValue from frontend
        const { prompt } = req.body;

        const response = await openai.createCompletion({
            model:"text-davinci-003",
            prompt:prompt,
            temperature:0.5,
            max_tokens:3000,
            top_p:1,
            frequency_penalty:0.5,
            presence_penalty:0
        });

        //console.log("openai:", openai);
        console.log("response.data:", response.data);
        res.send(response.data.choices[0].text);
    } catch(err){
        console.error(`openai error:`, err);
        res.sendStatus(504);
    }
});




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started listening to ${PORT}`);
});