mod play;

use play::play_sound;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tokio::spawn(async move {
      let url = "https://www.w3schools.com/html/horse.ogg";
      play_sound(&url).await;
    });
    Ok(())
}
