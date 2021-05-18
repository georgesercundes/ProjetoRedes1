import http.server
import socketserver
import socket

HOSTNAME = socket.gethostname()
IPADDRESS = socket.gethostbyname(HOSTNAME)

PORT = 8000

handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer((IPADDRESS, PORT), handler) as httpd:
    print("Servidor aguardando no endereço {}:{}".format(IPADDRESS, str(PORT)))
    httpd.serve_forever()
