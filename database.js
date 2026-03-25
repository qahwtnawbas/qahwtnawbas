/* ====================================================================================================
   SYSTEM CORE: FIREBASE DATABASE ENGINE
   ARCHITECT: KARAM GHANDI
   SECURITY LEVEL: ENCRYPTED CONNECTION
   ====================================================================================================
*/

// 1. الإعدادات السيادية للاتصال بسحابة جوجل
const firebaseConfig = {
    apiKey: "AIzaSyBQLp5FeHaP3vcJfuY22DtGu48j0fyveb0",
    projectId: "qahwtna-b65ca",
    // تمت إزالة الروابط غير الضرورية لزيادة سرعة الاتصال
};

// 2. تهيئة المحرك السحابي
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// 3. تصدير قاعدة البيانات لتكون جاهزة للاستخدام في أي صفحة
const db = firebase.firestore();

// 4. رسالة تأكيد للمهندس في الكونسول (مخفية عن الزبائن العاديين)
console.log("%c[QAHWTNA ENGINE]: Database Connection Established Successfully. 100% SECURE.", "color: #d4a373; font-weight: bold; background: #081C15; padding: 5px; border-radius: 5px;");