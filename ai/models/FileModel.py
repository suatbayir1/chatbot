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


    def split_docs(self, documents, chunk_size=1000, chunk_overlap=20):
        text_splitter=RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
        docs=text_splitter.split_documents(documents)
        return docs


    def createIndexFromPDF(self, pdfname):
        loader = PyPDFLoader(secret.path["PDF_PATH"] + "/" + pdfname)
        data = loader.load()
        docs = self.split_docs(data)

        self.saveIndex(docs, pdfname)

        newValues = {
            "status": "INDEXED",
            "indexSavedName": os.path.splitext(pdfname.replace(" ", "-"))[0],
            "updatedAt": datetime.now()
        }

        return newValues
    

    def saveIndex(self, document, pdfname):
        tf = TensorflowHubEmbeddings(model_url= secret.path["EMBEDDING_MODEL_PATH"])
        vectorstore = FAISS.from_documents(document, tf)
        vectorfile_name = secret.path["INDEX_PATH"] + "/" + os.path.splitext(pdfname.replace(" ", "-"))[0]
        vectorstore.save_local(vectorfile_name)