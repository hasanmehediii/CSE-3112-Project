from datetime import datetime
from pydantic import BaseModel, ConfigDict

class InvoiceOut(BaseModel):
    id: int
    canteen_id: int
    order_id: int
    total_amount: float
    issued_at: datetime

    model_config = ConfigDict(from_attributes=True)
