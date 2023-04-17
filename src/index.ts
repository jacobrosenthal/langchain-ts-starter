import { VectorStore } from "langchain/vectorstores";
import { ChainInputs, LLMChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  BasePromptTemplate,
} from "langchain/prompts";
import { Document } from "langchain/document";
import { BaseLanguageModel } from "langchain/base_language";
import { ChainValues } from "langchain/schema";

export interface MyChainInput extends ChainInputs {
  prompt?: BasePromptTemplate;
  llm: BaseLanguageModel;
  vectorStore: VectorStore;
}

export class MyChain extends LLMChain implements MyChainInput {
  vectorStore: VectorStore;

  constructor(fields: MyChainInput) {
    const prompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(`Context: {context}

      Assistant is a large language model trained by OpenAI.

      Assistant is designed to be able to assist with a wide range of tasks, from answering simple questions to providing in-depth explanations and discussions on a wide range of topics. As a language model, Assistant is able to generate human-like text based on the input it receives, allowing it to engage in natural-sounding conversations and provide responses that are coherent and relevant to the topic at hand.
      
      Assistant is constantly learning and improving, and its capabilities are constantly evolving. It is able to process and understand large amounts of text, and can use this knowledge to provide accurate and informative responses to a wide range of questions. Additionally, Assistant is able to generate its own text based on the input it receives, allowing it to engage in discussions and provide explanations and descriptions on a wide range of topics.
      
      Overall, Assistant is a powerful system that can help with a wide range of tasks and provide valuable insights and information on a wide range of topics. Whether you need help with a specific question or just want to have a conversation about a particular topic, Assistant is here to assist.`),
      HumanMessagePromptTemplate.fromTemplate(`{input}`),
    ]);

    const f = {
      prompt: fields.prompt || prompt,
      llm: fields.llm,
    };

    super(f);

    this.vectorStore = fields.vectorStore;
  }

  // hook call to inject our context from vectorStore
  async _call(values: ChainValues): Promise<ChainValues> {
    const whatevers = await this.vectorStore.similaritySearch(values.input, 4);
    const whatevers_texts = (whatevers as Document[]).map(
      ({ pageContent, metadata }) =>
        `${pageContent} ${metadata.url ? metadata.url : ""}`
    );

    const v = values;
    v.context = whatevers_texts.join("\n\n");
    const promptValue = await this.prompt.formatPromptValue(v);

    const { generations } = await this.llm.generatePrompt([promptValue]);
    return {
      [this.outputKey]: await this._getFinalOutput(generations[0], promptValue),
    };
  }
}
