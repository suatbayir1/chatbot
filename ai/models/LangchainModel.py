import json
from databases.MongoDB import MongoDB
from bson.json_util import loads, dumps
from werkzeug.security import generate_password_hash, check_password_hash
from helpers.ModelHelper import ModelHelper
from bson import ObjectId
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.callbacks.base import AsyncCallbackHandler
from langchain.callbacks.manager import AsyncCallbackManager
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.llms import LlamaCpp, Ollama
from langchain.vectorstores import FAISS
from huggingface_hub import hf_hub_download
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.embeddings import GPT4AllEmbeddings, TensorflowHubEmbeddings

from langchain.chains.chat_vector_db.prompts import CONDENSE_QUESTION_PROMPT, QA_PROMPT
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
import random
import os
from config import secret


class LangchainModel():
    def __init__(self):
        self.db = MongoDB()
        self.collection = "documents"
        self.modelHelper = ModelHelper()


    def get_chain(stream_handler, vectordb) -> ConversationalRetrievalChain:
        """Create a ConversationalRetrievalChain for question/answering."""


        manager = AsyncCallbackManager([])
        stream_manager = AsyncCallbackManager([stream_handler])

        llm = Ollama(
        base_url="http://localhost:11434",
        model="mistral",
        verbose=True,
        callback_manager=stream_manager,
        )


        memory = ConversationBufferMemory(memory_key="chat_history", input_key='question', output_key='answer', return_messages=True)

        qa = ConversationalRetrievalChain.from_llm(llm, vectordb.as_retriever(search_kwargs={'k': 1}), memory=memory, return_source_documents=True)

        return qa

    

