// app.js

const contentElement = document.getElementById('content');
// 🌟 パスの重要ポイント 🌟
// contentフォルダの中にある home.md を指定する
const markdownFilePath = './content/home.md'; 

// Markdownファイルを非同期で読み込む関数
async function loadMarkdown(path) {
    try {
        const response = await fetch(path);
        
        // 404などのエラーチェック
        if (!response.ok) {
            // エラーが発生した場合、コンテンツ表示エリアにエラーメッセージを表示
            contentElement.innerHTML = `<p style="color: red;">エラー: ${path} が見つかりません (HTTP ${response.status})</p>`;
            // サーバーログで「GET /content/home.md」が 404 になっていないか確認！
            throw new Error(`ファイルの読み込みに失敗しました: ${response.status}`);
        }
        
        const markdownText = await response.text();
        return markdownText;
    } catch (error) {
        console.error('Markdownの読み込みエラー:', error);
        return null;
    }
}

// 読み込んだMarkdownをHTMLに変換し、ページに挿入する
async function renderHomePage() {
    const markdownContent = await loadMarkdown(markdownFilePath);

    if (markdownContent) {
        // Marked.jsを使ってHTMLに変換
        const htmlContent = marked.parse(markdownContent); 
        
        // DOMに挿入
        contentElement.innerHTML = htmlContent;
    }
}

// ページ読み込み時に実行
renderHomePage();