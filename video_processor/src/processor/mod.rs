use std::error::Error;
use std::fs::{File, remove_file};
use std::io::{self};
use std::process::Command;

use crate::upload::upload_r2;

pub async fn convert_video(input_url: &str, output_path: &str, width: u16, height: u16, ep_id: String) -> Result<(), Box<dyn Error>> {
    let response = ureq::get(input_url).call()?;

    if response.status() != 200 {
        return Err("Erro ao baixar o vídeo".into());
    }

    let temp = &format!("temp-{}.mp4", height);

    let mut file = File::create(temp)?;
    io::copy(&mut response.into_reader(), &mut file)?;

    let status: std::process::ExitStatus = Command::new("ffmpeg")
        .args(&[
            "-i", &format!("./{}", temp),
            "-vf", &format!("scale={}:{}", width, height),
            "-c:a", "copy",
            output_path,
        ])
        .status()?;

    if !status.success() {
        return Err("Falha ao converter o vídeo".into());
    }

    remove_file(temp)?;

    upload_r2(&mut file, &ep_id, height).await.unwrap();

    Ok(())

}
