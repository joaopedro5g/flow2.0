use std::{io::Error, path::Path};
use rusoto_core::{ByteStream, Region};
use rusoto_s3::{PutObjectRequest, S3Client, S3};
use tokio::{fs::File, io::AsyncReadExt};
use futures::stream;
use bytes::Bytes;

pub async fn upload_r2(file_path: String, ep_id: &str, quality: u16) -> Result<(), Error> {
    let path = Path::new(&file_path);
    let bucket = "nixsolucoes";
    let key = format!("{}/{}.mp4", ep_id, quality);
    let mut file = File::open(&path).await?;
    let endpoint = std::env::var("AWS_ENDPOINT_URL").unwrap();

    let client = S3Client::new(Region::Custom { name: "auto".into(), endpoint  });

    let file_size = file.metadata().await.unwrap().len();
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer).await.expect("Error on read buffer of file");

    let bytes = Bytes::from(buffer);
    let stream = stream::once(async { Ok::<Bytes, Error>(bytes) });

    client.put_object(PutObjectRequest {
        body: Some(ByteStream::new(stream)),
        bucket: bucket.into(),
        content_length: Some(file_size.try_into().unwrap()),
        content_type: Some("video/mp4".to_string()),
        key,
        ..Default::default()
    }).await.unwrap();
    Ok(())
}