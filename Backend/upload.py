import os
import shutil
from fastapi import UploadFile, File, HTTPException
from pathlib import Path

UPLOAD_DIR = Path("Backend/uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

async def upload_dataset(file: UploadFile = File(...)):
    # Validate file type
    allowed_extensions = {".csv", ".xlsx", ".xls", ".json"}
    file_extension = Path(file.filename).suffix.lower()

    if file_extension not in allowed_extensions:
        raise HTTPException(status_code=400, detail="File type not supported. Please upload CSV, Excel, or JSON files.")

    # Generate unique filename
    import uuid
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = UPLOAD_DIR / unique_filename

    # Save file
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")

    return {"filename": unique_filename, "original_name": file.filename}