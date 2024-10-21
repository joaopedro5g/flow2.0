use std::sync::{Arc, Mutex};

use amiquip::{Connection, ConsumerOptions, QueueDeclareOptions};
use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub struct Video {
    pub url: String,
}

#[derive(Deserialize, Debug)]
pub struct Data {
    pub video: Video,
    pub id: String
}

#[derive(Deserialize, Debug)]
struct MessageBody {
    pattern: String,
    data: Data,
}

pub struct RabbitMQConnect {
    conn: Arc<Mutex<Option<Connection>>>
}

impl RabbitMQConnect {
    pub fn init() -> Self {
        let conn = Connection::insecure_open("amqp://guest:guest@localhost:5672")
            .expect("Error on connect to RMQ");

        RabbitMQConnect { conn: Arc::new(Mutex::new(Some(conn))) }
    }

    pub fn on_create<F>(&self, cb: F) where F: Fn(Data) {
        let mut conn = self.conn.lock().unwrap();
        if let Some(mut conn) = conn.take() {
            let ch = conn.open_channel(None).expect("Error on open channel");

            let queue = ch.queue_declare("video_queue", QueueDeclareOptions::default())
                .expect("Error on listen queue");

            let consumer = queue.consume(ConsumerOptions::default())
                .expect("Error on created consumer");

            for (_, msg) in consumer.receiver().iter().enumerate() {
                match msg {
                    amiquip::ConsumerMessage::Delivery(delivery) => {
                        let body_string = String::from_utf8_lossy(&delivery.body).to_string();
                        match serde_json::from_str::<MessageBody>(&body_string.as_str()) {
                            Ok(msg) => {
                                if msg.pattern.as_str() == "episode.upload.create" {
                                    cb(msg.data)
                                }
                            }
                            Err(_) => {},
                        }
                        consumer.ack(delivery).expect("Error on confirm message");
                    }
                    amiquip::ConsumerMessage::ClientCancelled => {},
                    amiquip::ConsumerMessage::ServerCancelled => {},
                    amiquip::ConsumerMessage::ClientClosedChannel => {},
                    amiquip::ConsumerMessage::ServerClosedChannel(_error) => {},
                    amiquip::ConsumerMessage::ClientClosedConnection => {},
                    amiquip::ConsumerMessage::ServerClosedConnection(_error) => {},
                }
            }
        }
    }

    pub fn close(&self) {
        let mut conn = self.conn.lock().unwrap();
        if let Some(conn) = conn.take() {
            conn.close().expect("Error on close connection");
        }
    }
}