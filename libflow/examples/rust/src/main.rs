use libflow::{init, free_init};
use std::ffi::CString;
fn main() {

  let ws = libflow::init();

  if ws.is_null() { return; }

  unsafe {
    (*ws).next();
  }
  unsafe { free_init(ws); }

  // let url = CString::new("https://cdn.nixsolucoes.com.br/Nothing%20Else%20Matters.mp3").expect("Error");
  // unsafe {
  //   play(url.as_ptr());
  // }
}
