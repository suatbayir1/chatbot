from fastapi import APIRouter, File, UploadFile, Form, Request, Response, status
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
from models.FileModel import FileModel
from lanarky import LangchainRouter
import logging
from middlewares.Base import Base
from config import secret
from datetime import datetime


router = APIRouter(
    prefix="/file",
    tags=["file"],
    responses={404: {"description": "Not found"}},
)

FileModel = FileModel()

class FileController(Base):
    def __init__(self):
        pass

    @router.get("/pdftoindex/{documentid}", tags=["pdftoindex"], status_code=200)
    async def pdf_to_index(request: Request, documentid: str, response: Response):

        pdf = FileModel.getByID(documentid)
        if pdf[0]["status"] == "UPLOADED":
            newValues = FileModel.createIndexFromPDF(pdf[0]["savedName"])
            FileModel.updateByID(documentid, newValues)

        else:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {"message": f"There is an error"}
                    
        return {"message": f"Successfuly indexed {documentid}"}    