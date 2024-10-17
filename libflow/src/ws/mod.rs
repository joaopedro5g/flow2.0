use rust_socketio::client::Client;

#[allow(dead_code)]
pub struct WebSocket {
  socket: Client,
}


impl WebSocket {
  pub fn init() -> Self {
    let socket = rust_socketio::ClientBuilder::new("http://localhost:3000")
      .on("play", WebSocket::on_play)
      .connect()
      .expect("Error on connect to datacenter");
    WebSocket { socket }
  }
  fn on_play(payload: rust_socketio::Payload, _socket: rust_socketio::RawClient) {
    match payload {
      rust_socketio::Payload::Binary(_bin) => {}
      rust_socketio::Payload::Text(_txt) => {}
      #[allow(deprecated)]
      rust_socketio::Payload::String(_) => {},
    }
  }

  pub fn next(&self) {
    self.socket.emit("next-ep", serde_json::json!({ "ep": 10 })).expect("Error on send command to datacenter");
  }
}