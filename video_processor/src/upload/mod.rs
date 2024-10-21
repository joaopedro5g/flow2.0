use std::{fs::File, io::{Error, Read}};

use cloudflare_r2_rs::r2::R2Manager;

pub async fn upload_r2(file: &mut File, ep_id: &str, quality: u16) -> Result<(), Error> {
    let api_key = std::env::var("CLOUDFLARE_ACCESS_KEY").unwrap();
    let key_secret = std::env::var("CLOUDFLARE_KEY_SECRET").unwrap();
    let account_id = std::env::var("CLOUDFLARE_ACCOUNT_ID").unwrap();
    let url = &format!("https://{}.r2.cloudflarestorage.com", &account_id);
    let r2 = R2Manager::new("nixsolucoes",url , &api_key, &key_secret).await;

    let folder = &format!("/uploads/{}/{}", ep_id, quality);
    let mut buffer = Vec::new();

    file.read_to_end(&mut buffer).expect("Error on process to buffer");
    r2.upload(folder, &buffer, Some("max-age=60"), Some("video/mp4")).await;
    Ok(())
}