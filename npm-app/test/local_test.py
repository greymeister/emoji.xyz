import httplib

# Request: Local emoji-web (http://localhost:5000/shorten)

connection = httplib.HTTPConnection('localhost', 5000, timeout = 30)

# Headers

headers = {"Content-Type":"application/json"}

# Body

body = "{\"url\":\"http://google.com\"}"

# Send synchronously

connection.request('POST', '/shorten', body, headers)
try:
	response = connection.getresponse()
	content = response.read()
	# Success
	print('Response status ' + str(response.status))
except httplib.HTTPException, e:
	# Exception
	print('Exception during request')
