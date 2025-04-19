# API de Bebidas (Python + FastAPI)


## Instrucciones de ejecución


1. Crear entorno virtual
```bash
python3 -m venv venv
```
2. Activar entorno virtual
```bash
# Linux: source venv/bin/activate  
# Windows: venv\Scripts\activate
```

3. Instalar dependencias especificas (incluidas en el requirements.txt)
```bash
pip install -r requirements.txt
```

4. Ejecutar la API
```bash
uvicorn app.main:app --reload
```

- Servidor:
    * http://127.0.0.1:8000/
- Documentación automatica:
    * http://127.0.0.1:8000/docs

5. Ejecutar pruebas y análisis (desde la ruta raíz del proyecto)
- Coverage:
```bash
pytest --cov=app --cov-report=term-missing
```
- mypy
```bash
mypy app/
```
- pylint
```bash
pylint app/
```