import os
from config import secret
from databases.MongoDB import MongoDB
from helpers.ModelHelper import ModelHelper
from bson import ObjectId
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import TensorflowHubEmbeddings
from langchain.vectorstores import FAISS
from datetime import datetime


class FileModel():
    def __init__(self):
        self.db = MongoDB()
        self.collection = "documents"
        self.modelHelper = ModelHelper()

    def getByID(self, id):
            where = {
                "_id": ObjectId(id)
            }

            return self.modelHelper.cursor_to_json(self.db.find(self.collection, where))
    

    def updateByID(self, id, newValues):
         where = {
              "_id": ObjectId(id)
         }

         values = {
              '$set': newValues
              }

         return self.db.update_one(self.collection, values, where)


    def createIndexFromPDF(self, pdfname):
        loader = PyPDFLoader(secret.path["PDF_PATH"] + "/" + pdfname)
        data = loader.load()
        text_splitter=RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        docs=text_splitter.split_documents(data)
        tf = TensorflowHubEmbeddings(model_url= secret.path["EMBEDDING_MODEL_PATH"])
        vectorstore = FAISS.from_documents(docs, tf)
        vectorfile_name = secret.path["INDEX_PATH"] + "/" + os.path.splitext(pdfname.replace(" ", "-"))[0]
        vectorstore.save_local(vectorfile_name)

        newValues = {
            "status": "INDEXED",
            "indexSavedName": os.path.splitext(pdfname.replace(" ", "-"))[0],
            "updatedAt": datetime.now()
        }

        return newValues