use std::io::Error;
use std::process::Command;

use tokio::fs::remove_file;
use tokio::io::AsyncWriteExt;
use tokio::fs::File;
use tokio::time::{sleep, Duration};

use crate::upload::upload_r2;

async fn wait_for_download(file: &File, expected_size: u64) -> Result<(), Error> {
    loop {
        let current_size = file.metadata().await?.len();
        
        if current_size >= expected_size {
            return Ok(());
        }

        sleep(Duration::from_secs(1)).await;
    }
}

pub async fn convert_video(input_url: &str, width: u16, height: u16, ep_id: String) -> Result<(), Error> {
    let mut response = reqwest::get(input_url).await.unwrap();

    if response.status() != 200 {
        return Err(Error::new(std::io::ErrorKind::ConnectionRefused, "Erro ao baixar o arquivo"));
    }

    let temp = &format!("temp-{}.mp4", height);
    println!("Iniciando o download do vídeo...");

    let expected_size = response.content_length().unwrap_or(0);
    let mut file = File::create(temp).await.unwrap();
    
    while let Some(chunk) = response.chunk().await.unwrap() {
        file.write_all(&chunk).await.unwrap();
    }
    
    wait_for_download(&file, expected_size).await?;

    
    
    let output_file = format!("compiletd-{}.mp4", height);
    
    let status: std::process::ExitStatus = Command::new("ffmpeg")
    .args(&[
            "-i", &format!("./{}", temp),
            "-vf", &format!("scale={}:{}", width, height),
            "-c:a", "copy",
            &output_file,
        ])
        .status()?;

    if !status.success() {
        return Err(Error::new(std::io::ErrorKind::ConnectionAborted, "Falha ao converter o vídeo".to_string()));
    }

    println!("Iniciando limpeza...");
    
    remove_file(temp).await.expect("Erro ao deletar o arquivo temporário");
    println!("Limpeza executado com sucesso...");
    println!("Iniciando o upload do vídeo...");

    upload_r2(output_file.clone(), &ep_id, height).await.unwrap();
    println!("Finalizado o Upload...");

    remove_file(output_file.clone()).await.expect("Erro ao deletar o arquivo compilado");

    Ok(())
}
