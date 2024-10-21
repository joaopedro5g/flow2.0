mod rabbitmq;
mod processor;
mod upload;

use tokio::task;

use rabbitmq::RabbitMQConnect;
use processor::convert_video;

#[tokio::main]
async fn main() {
    let rmq = RabbitMQConnect::init();
    let quality = [(640,480), (640,360)];
    rmq.on_create(|data| {
        let url_data = data.video.url;
        let id_data = data.id;
        quality.map(|(width,height)| {
            let url = url_data.clone();
            let id = id_data.clone();
            task::spawn(async move {
                convert_video(&url, &format!("video-{}p.mp4", height), width,height, id).await.unwrap();
            });
        });
    });
}

