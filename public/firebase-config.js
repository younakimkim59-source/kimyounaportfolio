// Firebase 설정 파일
// Firebase Console에서 설정 정보를 가져와서 입력하세요
// Firebase Console > Project Settings > General > Your apps > Config

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "kimyounaportfolio",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebase 초기화 (모듈 방식)
let app = null;
let db = null;
let storage = null;

async function initFirebase() {
    if (app && db && storage) {
        return { app, db, storage };
    }
    
    try {
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
        const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        const { getStorage } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js');
        
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        storage = getStorage(app);
        
        return { app, db, storage };
    } catch (error) {
        console.error('Firebase 초기화 오류:', error);
        throw error;
    }
}

// 전역으로 사용할 수 있도록 export
window.firebaseConfig = firebaseConfig;
window.initFirebase = initFirebase;

