def nextToken():
    return ""

def generate(response):
    token=nextToken()
    if token=="<|endoftext|>":
        return response
    generate(response)


    
