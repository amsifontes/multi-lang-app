import 'dart:io';

Future<void> main(List<String> arguments) async {
    var server = await HttpServer.bind(InternetAddress.anyIPv4, 8082);
    print('Listening on port ${server.port}');

    await for (HttpRequest request in server) {
        if (request.method == 'GET' && request.uri.path == '/') {
            request.response
                ..statusCode = HttpStatus.ok
                ..headers.contentType = ContentType.json
                ..write('{"message": "Hello from Dart"}');
        } else {
            request.response
                ..statusCode = HttpStatus.notFound
                // ..write('{"message": "Not Found"}');
                ..write('Not Found');
        }
        await request.response.close();
    }
}