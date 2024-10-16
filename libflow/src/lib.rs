mod play;

use std::{ffi::CStr, sync::Arc};
use tokio::sync::Mutex;

use play::play_sound;

#[no_mangle]
pub extern "C" fn play(url: *const i8) -> *mut std::ffi::c_void {
  let c_str = unsafe { CStr::from_ptr(url) };
  let url_str = c_str.to_str().unwrap();
  let url_mutex = Arc::new(Mutex::new(url_str));
  let rt = tokio::runtime::Runtime::new().expect("could not create tokio runtime");
  let url_clone = Arc::clone(&url_mutex);
  rt.spawn(async move {
    let url = url_clone.lock().await;
    play_sound(&*url).await;
  });

  std::ptr::null_mut()
}
