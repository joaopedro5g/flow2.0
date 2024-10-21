# LibFlow

LibFlow é uma lib para adicionar em sistemas embarcados, que vem com funções para se conectar ao protocolo Flow Connect, permitindo que ouvintes do Flow usem seu hardware para ouvir os episódios.

> 💡 Vale a pena ressaltar que o Libflow já está configurado para capturar a placa de áudio padrão do hardware. Não é necessário configurá-lo.

## Métodos

### `init`

- **Descrição**: Inicializa a biblioteca e retorna uma implementação de WebSocket.
- **Parâmetros**: Nenhum.
- **Retorno**: Uma estrutura que contém a função `next`, que pode ser chamada para pular os episódios.

### `free_init`

- **Descrição**: Libera a memória alocada durante a inicialização da biblioteca.
- **Parâmetros**: Nenhum.
- **Retorno**: Nenhum.

### `play`

- **Descrição**: Executa a função de reprodução no projeto, onde é possível tocar o som.
- **Parâmetros**:
  - `url`: Ponteiro para uma string C contendo a URL do episódio a ser reproduzido.
- **Retorno**: Nenhum.

> ⚠️ Lembrando que ainda está em desenvolvimento essa lib (o projeto inteiro), então não tem métodos suficientes para realizar testes.

## Exemplo de Uso em Rust

Aqui está um exemplo de como usar a LibFlow em um programa Rust:

```rust
use std::ffi::CString;
use std::ptr;

// Declarar as funções externas que serão implementadas na DLL
extern "C" {
    fn init() -> *mut WebSocket; // Inicializa a biblioteca
    fn free_init(ws: *mut WebSocket); // Libera a memória
    fn play(url: *const libc::c_char); // Função para tocar o som
}

fn main() {
    let url = CString::new("https://exemplo.com/episodio.mp3").expect("CString::new failed");

    unsafe {
        let ws = init(); // Inicializa a biblioteca
        play(url.as_ptr()); // Chama a função play da DLL
        free_init(ws); // Libera a memória
    }
}
```

### Compilação do Exemplo Rust

Para compilar a biblioteca e criar a DLL, você pode usar o seguinte comando:

```bash
cargo build --release
```

> 🔗 **Importante**: Certifique-se de que a DLL (`libflow.dll`) esteja no mesmo diretório do executável ou em um diretório que esteja no `PATH` do sistema.

---
