from bson import ObjectId

def serialize_doc(doc: dict) -> dict:
    if not doc:
        return doc
    out = {}
    for k, v in doc.items():
        if isinstance(v, ObjectId):
            out[k] = str(v)
        elif isinstance(v, list):
            out[k] = [str(x) if isinstance(x, ObjectId) else x for x in v]
        else:
            out[k] = v
    return out

def serialize_list(docs: list) -> list:
    return [serialize_doc(d) for d in docs]