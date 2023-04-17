import { OpenAIEmbeddings } from "langchain/embeddings";
import { Document } from "langchain/document";
import { SupabaseVectorStore } from "langchain/vectorstores";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const run = async () => {
  const client = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_PRIVATE_KEY || ""
  );

  await ingestWhatever(client);
};

run();

async function ingestWhatever(client: SupabaseClient) {
  const vectorStore = await SupabaseVectorStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    {
      client,
      tableName: "whatever",
      queryName: "match_whatever",
    }
  );

  // from somewhere
  const rows = [];
  for await (const row of rows) {
    const doc = new Document({
      pageContent: "",
      metadata: {},
    });

    await vectorStore.addDocuments([doc]);
  }
}
