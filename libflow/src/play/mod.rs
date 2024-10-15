use rodio::{Decoder, OutputStream, Sink};
use std::io::{BufReader, Cursor, Read};
use ureq::Agent;
use std::time::Duration;

pub async fn play_sound(url: &str){
  let agent = Agent::new();
  let response = agent.get(url).call();

  match response {
    Err(e) => {
      println!("Erro ao baixar o áudio: {e}");
    }
    Ok(res) => {
      let sound =  OutputStream::try_default();
      match sound {
        Ok((_stream, stream_handle)) => {
          let sink = Sink::try_new(&stream_handle);
          match sink {
            Err(e) => {
              panic!("Erro: {e}")
            }
            Ok(sink) => {
              let mut reader = res.into_reader();
              let mut chunk = [0; 64000]; // 64KB
              let mut buffer = Vec::new();

              loop {
                match reader.read(&mut chunk) {
                  Ok(size) if size > 0 => {
                    buffer.extend_from_slice(&chunk[..size]);
                  }
                  Ok(_) => {
                    if buffer.len() > 4096 {
                      let cursor = Cursor::new(buffer.clone());
                      if let Ok(source) = Decoder::new(BufReader::new(cursor)) {
                        sink.append(source);
                        buffer.clear();
                      }
                    }
                    if buffer.len() <= 0 {
                      break;
                    }
                  }
                  Err(e) => {
                    println!("Erro ao ler o áudio: {e}");
                  }
                }

                if !sink.empty() {
                  std::thread::sleep(Duration::from_millis(500));
                }
              }
              
              sink.sleep_until_end();
            }
          }
        }
        Err(e) => {
          panic!("Erro: {e}")
        }
      }
    }
  }
}