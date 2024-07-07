use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use serde::Serialize;

#[derive(Serialize)]
struct Greeting {
    message: String,
}

async fn greet() -> impl Responder {
    let response = Greeting {
        message: String::from("Hello from Rust"),
    };
    HttpResponse::Ok().json(response)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().route("/", web::get().to(greet))
    })
    .bind("0.0.0.0:8081")?
    .run()
    .await
}
