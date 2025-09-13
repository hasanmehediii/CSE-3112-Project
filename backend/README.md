## How to Run:

1. Create Virtual Environment:
    ```
    python3 -m venv venv
2. Activate venv:
    ```
    source venv/bin/activate (Linux)

    venv/Scripts/Activate (Windows)
3. Library Install:
    ```
    pip install -m requirements.txt
4. Run Server:
    ```
    uvicorn main:app --host $HOST --port $PORT --reload (Linux)

    uvicorn main:app --host $HOST --port $PORT --reload (Windows CMD)