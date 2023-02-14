const router = require("express").Router()
const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, //`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`,
})
const openai = new OpenAIApi(configuration)

const basePromptPrefix = `You are a smart and creative ai, I will give you a book name, determine its genre and recommend me at least 8 songs based on that, write back only the song titles, no extra text and make sure you return them in json format.
Bookname: `

router.post("/api/bookinfo", async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: ` ${basePromptPrefix} ${req.body.bookName} Output:`,
      max_tokens: 750,
      temperature: 0.8,
    })
    const basePromptOutput = response.data.choices.pop()
    res.status(200).json({ output: basePromptOutput })
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
