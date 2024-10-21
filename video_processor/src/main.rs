mod rabbitmq;
mod request;


use std::thread;

use rabbitmq::RabbitMQConnect;
use request::convert_video;


fn main() {
    let rmq = RabbitMQConnect::init();
    let quality = [(640,480), (640,360)];
    rmq.on_create(|data| {
        for (width,height) in  quality {
            let url = data.video.url.clone();
            thread::spawn(move || {
                convert_video(&url, &format!("video-{}p.mp4", height), width,height).unwrap();
            }).join().unwrap();
        }
    });
}

