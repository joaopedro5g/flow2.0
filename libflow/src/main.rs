use rodio::{Decoder, OutputStream, Sink};
use std::io::{Cursor, Read, BufReader};
use ureq::Agent;
use std::time::Duration;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let url = "https://cdn.nixsolucoes.com.br/Sympathy%20For%20The%20Devil.mp3";

    let agent = Agent::new();
    let response = agent.get(url).call();

    match response {
      Err(e) => {
        println!("Erro ao baixar o áudio: {e}");
      }
      Ok(res) => {
        let (_stream, stream_handle) = OutputStream::try_default()?;
        let sink = Sink::try_new(&stream_handle)?;

        let mut reader = res.into_reader();
        let mut chunk = [0; 64000]; // 64KB
        let mut buffer = Vec::new();

        loop {
          match reader.read(&mut chunk) {
            Ok(size) if size > 0 => {
              buffer.extend_from_slice(&chunk[..size]);
            }
            Ok(_) => {
              if buffer.len() > 64000 {
                let cursor = Cursor::new(buffer.clone());
                if let Ok(source) = Decoder::new(BufReader::new(cursor)) {
                  sink.append(source);
                  buffer.clear();
                }
              }
            }
            Err(e) => {
              println!("Erro ao ler o áudio: {e}");
              break;
            }
          }

          if !sink.empty() {
            std::thread::sleep(Duration::from_millis(500));
          }
        }

        sink.sleep_until_end();
      }
    }

    Ok(())
}
