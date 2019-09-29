import socket

h = open('index.html', 'r')
homepage = h.read()

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
hostname = socket.gethostname()
IPaddress = socket.gethostbyname(hostname)

print (s)
print(IPaddress)
s.bind((IPaddress, 8760))
s.listen(5)

while True:
    conn, addr = s.accept()
    print (conn)
    data = conn.recv(2000)

    P = data.split(b' ')
    #print(P)
    if P[0] == b'GET':
        print(P[0])
        if P[1] == b'/':
            print(P[1])
            resp = 'HTTP/1.1 200 OK\r\n' + \
                   'Content-Type: text/html\r\n' + \
                   'Content-Length: ' + str(len(homepage)) + \
                   '\r\n\r\n' + homepage
            resp = str.encode(resp)
            conn.sendall(resp)
        else:
            ext = str(P[1].rpartition(b'.')[-1])
            f = open(P[1][1:], 'rb')
            figure = f.read()
            resp = 'HTTP/1.1 200 OK\r\n' + \
                   'Content-Type: image' + ext + '\r\n' + \
                   'Content-Length: ' + str(len(figure)) + '\r\n\r\n'
            resp = str.encode(resp)
            conn.sendall(resp)
            conn.sendall(figure)

    conn.close()
s.close()