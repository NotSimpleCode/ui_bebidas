"""Módulo app.main de VirtualCoffee
    
    Contiene los endpoints para gestionar el menú de bebidas:
    - GET /menu
    - POST /menu
    - GET /menu/{name}
    """
from typing import List

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

class Bebida(BaseModel):
    name: str   = Field(..., min_length=1, description="Nombre de la bebida (no vacío)")
    size: str   = Field(..., min_length=1, description="Tamaño de la bebida")
    price: float = Field(..., gt=0,    description="Precio de la bebida (debe ser > 0)")

app = FastAPI(
    title="VirtualCoffee - API de Bebidas",
    version="0.1.0",
    description="API para gestionar el menú de bebidas de VirtualCoffee"
)

menu: List[Bebida] = []

@app.get("/menu", response_model=List[Bebida])
def obtener_menu():
    return menu

@app.post("/menu", response_model=Bebida, status_code=201)
def agregar_bebida(bebida: Bebida):
    # Validar que no exista una bebida con el mismo nombre y tamaño
    for existing in menu:
        if existing.name.lower() == bebida.name.lower() and \
            existing.size.lower() == bebida.size.lower():
            raise HTTPException(status_code=400, detail="Esta bebida ya existe")
    menu.append(bebida)
    return bebida

@app.get("/menu/{name}", response_model=Bebida)
def obtener_bebida(name: str):
    """Obtiene una bebida por su nombre (case-insensitive)"""
    for bebida in menu:
        if bebida.name.lower() == name.lower():
            return bebida
    raise HTTPException(status_code=404, detail="Bebida no encontrada")
