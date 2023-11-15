import json
from bson.json_util import loads, dumps

class ModelHelper():
    def cursor_to_json(self, cursor):
        return json.loads(dumps(list(cursor), indent = 2))