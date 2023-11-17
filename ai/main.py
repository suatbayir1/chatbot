from fastapi import Depends, FastAPI, Request
from controllers import FileController, LangchainController

app = FastAPI()


app.include_router(FileController.router)
app.include_router(LangchainController.router)

@app.get("/")
async def root():
    return {"message": "Server is running!"}


