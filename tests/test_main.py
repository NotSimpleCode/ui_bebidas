from fastapi.testclient import TestClient
import pytest

from app.main import app

client = TestClient(app)

def test_get_menu_vacio():
    response = client.get("/menu")
    assert response.status_code == 200
    assert response.json() == []

def test_agregar_bebida_valida():
    nueva_bebida = {"name": "Coca-Cola", "size": "1 Litro", "price": 3000}
    response = client.post("/menu", json=nueva_bebida)
    assert response.status_code == 201 
    data = response.json()
    assert data["name"] == "Coca-Cola"
    assert data["size"] == "1 Litro"
    assert data["price"] == 3000

def test_agregar_bebida_duplicada():
    bebida = {"name": "Espresso", "size": "Pequeño", "price": 6000}
    client.post("/menu", json=bebida)
    response = client.post("/menu", json=bebida)
    assert response.status_code == 400
    assert "ya existe" in response.json()["detail"]

def test_obtener_bebida_nombre():
    bebida = {"name": "Mocha", "size": "Grande", "price": 20000}
    client.post("/menu", json=bebida)
    response = client.get("/menu/Mocha")
    assert response.status_code == 200
    assert response.json()["name"] == "Mocha"

@pytest.mark.parametrize("nombre_invalido", [""])
def test_agregar_bebida_nombre_vacio(nombre_invalido):
    # Nombre vacío debe fallar validación de Pydantic
    bebida = {"name": nombre_invalido, "size": "Small", "price": 1.5}
    response = client.post("/menu", json=bebida)
    assert response.status_code == 422
    errors = response.json()["detail"]
    # Comprueba que uno de los errores apunte al campo 'name'
    assert any(err["loc"][-1] == "name" for err in errors)


@pytest.mark.parametrize("precio_invalido", [0, -10])
def test_agregar_bebida_valor_no_positivo(precio_invalido):
    # Precio cero o negativo debe fallar validación de Pydantic
    bebida = {"name": "Test", "size": "Medium", "price": precio_invalido}
    response = client.post("/menu", json=bebida)
    assert response.status_code == 422
    errors = response.json()["detail"]
    # Comprueba que uno de los errores apunte al campo 'price'
    assert any(err["loc"][-1] == "price" for err in errors)
