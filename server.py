import http.server
import socketserver

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = 'index.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

handler_object = MyHttpRequestHandler

PORT = 8080

if __name__ == "__main__":
    try:
        with socketserver.TCPServer(("", PORT), handler_object) as my_server:
            my_server.serve_forever()
    except PermissionError:
        print(f"Port {PORT} requires superuser privileges. Try running the script with sudo.")