// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::Manager;
use tauri::{WebviewUrl, WebviewWindowBuilder};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn open_note_window(
    window: tauri::Window,
    note_id: String,
    note_title: String,
    note_content: String,
) -> Result<(), ()> {
    let window_label = format!("note-{}", note_id);

    // 检查窗口是否已经存在
    if let Some(existing_window) = window.app_handle().get_webview_window(&window_label) {
        existing_window.set_focus().unwrap();
        return Ok(());
    }

    // 创建新窗口
    let _note_window = WebviewWindowBuilder::new(
        window.app_handle(),
        window_label,
        WebviewUrl::App("index-note.html".into()),
    )
    .title(format!("{} - ied-note", note_title))
    .inner_size(800.0, 600.0)
    .min_inner_size(400.0, 300.0)
    .resizable(true)
    .decorations(true)
    .always_on_top(false)
    .build()
    .unwrap();

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, open_note_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
