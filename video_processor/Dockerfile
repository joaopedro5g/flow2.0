FROM rust:latest

RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean

WORKDIR /usr/app

COPY . .

RUN cargo build --release

RUN chmod +x ./target/release/video_processor

CMD ["./target/release/video_processor"];
