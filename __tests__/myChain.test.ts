/* eslint-disable no-console */
import { CallbackManager } from "langchain/callbacks";
import { LLMResult } from "langchain/schema";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { MyChain } from "../src/index";

describe("MyChain should work correctly", () => {
  let chain: LLMChain;

  beforeEach(async () => {
    // logging
    const callbackManager = CallbackManager.fromHandlers({
      async handleLLMStart(_llm: { name: string }, prompts: string[]) {
        console.log(JSON.stringify(prompts, null, 2));
      },
      async handleLLMEnd(output: LLMResult) {
        for (const generation of output.generations) {
          for (const gen of generation) {
            console.log(gen.text);
          }
        }
      },
    });

    const llm = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0,
      callbackManager,
    });

    // use an in memory vector store since we dont have any docs yet
    // also initialize it with empty array since we dont have any docs
    const vectorStore = await MemoryVectorStore.fromDocuments(
      [],
      new OpenAIEmbeddings()
    );

    chain = MyChain.fromLLM(llm, vectorStore);
  }, 10000);

  it("should answer user input", async () => {
    const input = "Is it time to return to fruedian analysis?";
    console.log(`Executing with input "${input}"...`);

    const result = await chain.call({
      input,
    });

    console.log(JSON.stringify(result, null, 2));
  });
});
