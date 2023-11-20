from fastapi import Depends, FastAPI, Request
from controllers import FileController, LangchainController
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(FileController.router)
app.include_router(LangchainController.router)

@app.get("/")
async def root():
    return {"message": "Server is running!"}


