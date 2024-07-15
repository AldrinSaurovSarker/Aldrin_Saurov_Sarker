class ResponseModel:
    def __init__(self, status, data, message):
        self.status = status
        self.data = data
        self.message = message

    def to_dict(self):
        return {
            'status': self.status,
            'message': self.message,
            'data': self.data
        }
