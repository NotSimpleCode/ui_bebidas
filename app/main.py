"""Módulo app.main de VirtualCoffee
    
    Contiene los endpoints para gestionar el menú de bebidas:
    - GET /menu
    - POST /menu
    - GET /menu/{name}
    """
from typing import List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from db import menu_collection

class Bebida(BaseModel):
    name: str   = Field(..., min_length=1, description="Nombre de la bebida (no vacío)")
    size: str   = Field(..., min_length=1, description="Tamaño de la bebida")
    price: float = Field(..., gt=0,    description="Precio de la bebida (debe ser > 0)")
    

app = FastAPI(
    title="API de Bebidas",
    version="0.1.0",
    description="API para gestionar el menú de bebidas"
)

menu: List[Bebida] = []

@app.get("/menu", response_model=List[Bebida])
async def obtener_menu():
    cursor = menu_collection.find({})
    docs   = await cursor.to_list()
    return docs

@app.post("/menu", response_model=Bebida, status_code=201)
async def agregar_bebida(bebida: Bebida):    
    # Comprobar duplicados (name y size en minúsculas)
    filtro = {
        "_lc_name": bebida.name.casefold(),
        "_lc_size": bebida.size.casefold(),
    }
    if await menu_collection.find_one(filtro):
        raise HTTPException(status_code=400, detail="Esta bebida ya existe")
    
    doc = bebida.model_dump(exclude_none=True) | filtro
    await menu_collection.insert_one(doc)
    return bebida


@app.get("/menu/{name}", response_model=Bebida)
async def obtener_bebida(name: str):
    """Obtiene una bebida por su nombre (case-insensitive)"""
    filtro = {"_lc_name": name.casefold()}
    bebida = await menu_collection.find_one(filtro)
    if bebida:
        return bebida
    raise HTTPException(status_code=404, detail="Bebida no encontrada")
