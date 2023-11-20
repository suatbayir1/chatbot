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


    @router.websocket("/wstest")
    async def websocket_endpoint_test(websocket: WebSocket):
        await websocket.accept()

        while True:
            user_msg = await websocket.receive_text()
            resp = ChatResponse(sender="human", message=user_msg, type="stream")
            await websocket.send_json(resp.dict()) 

            start_resp = ChatResponse(sender="bot", message="", type="start")
            await websocket.send_json(start_resp.dict())

            resp = ChatResponse(sender="bot", message="Sender bot ve type stream ise", type="stream")
            await websocket.send_json(resp.dict())

            resp = ChatResponse(sender="bot", message="gelen mesajlar ekrana yazdırılacaktır.", type="stream")
            await websocket.send_json(resp.dict())

            resp = ChatResponse(sender="bot", message="Eğer sender bot ve type end ise", type="stream")
            await websocket.send_json(resp.dict())

            resp = ChatResponse(sender="bot", message="Source document gelecektir. ", type="stream")
            await websocket.send_json(resp.dict())            

            end_resp = ChatResponse(sender="bot", message="{'content': '\u00dcN\u0130TE 17 : Genden Proteine  ........................................................................................................ 247\\n\u00dcN\u0130TE 18 : Biyoteknoloji ve Gen M\u00fchendisli\u011fi  ............................................................................ 261\\n\u00dcN\u0130TE 19 : H\u00fccresel Solunum  ..................................................................................................... 271\\n\u00dcN\u0130TE 20 : Fotosentez ve Kemosentez ........................................................................................ 281\\n\u00dcN\u0130TE 21 : Bitkilerin Yap\u0131s\u0131  ........................................................................................................... 293\\n\u00dcN\u0130TE 22 : Bitkilerde Ta\u015f\u0131ma  ........................................................................................................ 303\\n\u00dcN\u0130TE 23 : Bitkilerde Beslenme ve Hareket ................................................................................. 311', 'metadata': {'source': 'f4dd8b44-3ccc-4dff-aca1-1a55ca426d00.pdf', 'page': 3}}", type="end")
            await websocket.send_json(end_resp.dict())            

    @router.websocket("/{chatid}/ws")
    async def websocket_endpoint(websocket: WebSocket, chatid = str):
        await websocket.accept()
        
        #doc = FileModel.getByID(chatid)

        #if doc[0]["status"] == "INDEXED":
        tf = TensorflowHubEmbeddings(model_url= secret.path["EMBEDDING_MODEL_PATH"])
        vectorstore = FAISS.load_local("/root/llm/chatbot/ai/public/indexdb/f4dd8b44-3ccc-4dff-aca1-1a55ca426d00", tf)
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
                return_message = {
                    "content": output["source_documents"][0].page_content,
                    "metadata": {
                        "source": os.path.basename(output["source_documents"][0].metadata["source"]),
                        "page": output["source_documents"][0].metadata["page"]
                    }
                }

                end_resp = ChatResponse(sender="bot", message=str(return_message), type="end")
                await websocket.send_json(end_resp.dict())
            