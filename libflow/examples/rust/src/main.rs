use libflow::play;
use std::ffi::CString;
fn main() {
  let url = CString::new("https://cdn.nixsolucoes.com.br/Nothing%20Else%20Matters.mp3").expect("Error");
  unsafe {
    play(url.as_ptr());
  }
}
