from fastapi import APIRouter, File, UploadFile, Form, Request, WebSocket, WebSocketDisconnect
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.callbacks.base import AsyncCallbackHandler
from langchain.callbacks.manager import AsyncCallbackManager
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.chains import RetrievalQAWithSourcesChain
from langchain.llms import LlamaCpp
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from huggingface_hub import hf_hub_download
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.embeddings import GPT4AllEmbeddings, TensorflowHubEmbeddings
from typing import List
import os
from models.LangchainModel import LangchainModel
from models.FileModel import FileModel
from lanarky import LangchainRouter
from helpers.Callback import StreamingLLMCallbackHandler
from helpers.Schemas import ChatResponse
import logging
from config import secret
from middlewares.Base import Base



router = APIRouter(
    prefix="/chat",
    tags=["chat"],
    responses={404: {"description": "Not found"}},
)

FileModel = FileModel()

#LangchainModel = LangchainModel()

class LangchainController(Base):
    def __init__(self):
        pass

    @router.websocket("/{chatid}/ws")
    async def websocket_endpoint(websocket: WebSocket, chatid = str):
        await websocket.accept()
        
        doc = FileModel.getByID(chatid)

        if doc[0]["status"] == "INDEXED":
            tf = TensorflowHubEmbeddings(model_url= secret.path["EMBEDDING_MODEL_PATH"])
            vectorstore = FAISS.load_local(secret.path["INDEX_PATH"] + "/" + doc[0]["indexSavedName"], tf)
            stream_handler = StreamingLLMCallbackHandler(websocket)
            qa_chain = LangchainModel.get_chain(stream_handler, vectorstore)


            while True:
                    # Receive and send back the client message
                    user_msg = await websocket.receive_text()
                    resp = ChatResponse(sender="human", message=user_msg, type="stream")
                    await websocket.send_json(resp.dict())

                    # Construct a response
                    start_resp = ChatResponse(sender="bot", message="", type="start")
                    await websocket.send_json(start_resp.dict())

                    # Send the message to the chain and feed the response back to the client
                    output = await qa_chain.acall(
                        {
                            "question": user_msg,
                            "chat_history": ""
                        }
                    )

                    # Send the end-response back to the client
                    end_resp = ChatResponse(sender="bot", message="", type="end")
                    await websocket.send_json(end_resp.dict())
            