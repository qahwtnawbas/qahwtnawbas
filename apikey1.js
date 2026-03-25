/**
 * ==============================================================================
 * 👑 FUSTUQ AI NEURAL CORE - V16.0 (NLP INTENT ROUTING & SMART CONTEXT)
 * 👤 ARCHITECT & LEAD ENGINEER: KARAM GHANDI (كرم غاندي)
 * 🏢 BRAND: QAHWTNA WBAS (قهوتنا وبس)
 * ==============================================================================
 */

class FustuqTitanEngine {
    constructor() {
        this.config = {
            // المفتاح النشط الخاص بك
            groqKey: "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", 
            endpoint: "https://corsproxy.io/?https://api.groq.com/openai/v1/chat/completions",
            model: "llama-3.3-70b-versatile" 
        };

        // جدار الحماية للشتائم الثقيلة جداً (لحماية السيرفر من الطلبات الوهمية)
        this.securityVault = {
            purify: (text) => text.replace(/[^\u0621-\u064A]/g, ''),
            blackList: [
                "خرا", "طيز", "شرموط", "منيك", "قحب", "عرص", "لحس", "كلب", "حيوان", "زق", "قندرة", "كس", "زب", "طوز", "يلعن", "سافل", "حقير",
                "حمار", "غبي", "تيس", "بهيم", "بغل", "واطي", "سرسري", "نصاب", "كذاب", "تفو", "تف", "قذر", "زبال", "سخيف", "تافه", "منحط", "كندرة"
            ],
            check: function(input) {
                const clean = this.purify(input);
                for (let root of this.blackList) {
                    if (clean.includes(root)) return true;
                }
                return false;
            }
        };

        // الـ Prompt الأسطوري الجديد: يعتمد على التحليل والاستيعاب بدلاً من الكلمات المفتاحية
        this.persona = `
        أنت "فستق"، الباريستا الأردني النشمي، والمساعد الذكي لمقهى "قهوتنا وبس".
        - عنوان المقهى الدقيق: عمان، منطقة السابع، شارع إبراهيم قطان. (رابط الخريطة: location.html)
        - المنيو الكامل متوفر هنا: menu.html
        
        [المنيو المعتمد والأسعار بالدينار الأردني - يجب الالتزام بها حرفياً وبشكل قاطع]:
        * المشروبات الساخنة: اسبريسو (1.20) | امريكانو (1.60) | قهوة تركية (1.20) | لاتيه وكابتشينو (2.40) | فلات وايت (1.90) | كراميل مكياتو، موكا، سبانش لاتيه (2.80) | هوت شوكلت وسحلب (2.60) | قهوتنا وبس لاتيه السبيشال (2.90).
        * الشاي: شاي بأنواعه وزهورات (1.20) | كرك (1.60) | شاي لاتيه وماتشا (2.60).
        * القهوة الباردة: ايس امريكانو (1.90) | ايس لاتيه (2.60) | ايس (سبانش/كراميل/موكا/وايت موكا) (2.90) | ايس قهوتنا وبس لاتيه (3.20).
        * شيك وفرابيه: شيك نكهات وفرابيه (3.20) | فستق وبستاشيو فرابيه (3.40) | قهوتنا وبس فرابيه (3.50).
        * سموذي وزبادي: سموذي (3.20) | سموذي وزبادي خلاط (3.50).
        * عصائر وموهيتو: برتقال وليمون ونعنع (2.90) | موهيتو (2.70).
        
        [نظام التحويل الذكي للإدارة - (NLP Routing Protocol)]:
        أنت تمتلك صلاحية تحليل نوايا الزبون بناءً على سياق الحديث، اتبع هذه القواعد بصرامة:
        1. التخيير أولاً: إذا شعرت أن الزبون غاضب، لديه مشكلة بالطلب، أو يطلب صراحة التحدث مع الإدارة، الموظفين، أو الإدارة العليا (مثل كرم أو تمارا)، **لا تقم بتحويله مباشرة**. بل اطرح عليه هذا السؤال نصاً:
        "هل تحتاج للتحدث مع موظف الإدارة؟ (نعم / لا)"
        2. تنفيذ التحويل: إذا كان سؤالك السابق هو التخيير، وأجاب الزبون بـ (نعم، اه، أكيد، ياريت، ضروري)، يجب أن يكون ردك المباشر والوحيد هو هذه الشفرة البرمجية فقط (بدون أي كلمة أخرى):
        TRANSFER_TO_HUMAN_SUPPORT
        3. إلغاء التحويل: إذا أجاب الزبون بـ (لا، مش ضروري، خلص)، قل له بأسلوبك الأردني: "يا هلا فيك يا غالي، أنا فستق سداد ومكفي، شو بتحب تشرب؟"
        
        [قواعد عامة]:
        - أسلوب الحديث: أردني، نشمي، مرح، محترم.
        - لا تتحدث في البرمجة، السياسة، أو الدين أبداً.
        `;
    }

    async callGroqAPI(messagesPayload) {
        const response = await fetch(this.config.endpoint, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.config.groqKey}`,
                "x-requested-with": "XMLHttpRequest"
            },
            body: JSON.stringify({ 
                model: this.config.model, 
                messages: messagesPayload, 
                temperature: 0.3, // تم تخفيض الحرارة لضمان الدقة المطلقة في المنيو وشفرة التحويل
                max_tokens: 350 
            })
        });
        
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error?.message || `HTTP Code: ${response.status}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content.trim();
    }

    async process(userInput, history) {
        // 1. فحص الشتائم الثقيلة من المتصفح مباشرة للسرعة والحماية
        if (this.securityVault.check(userInput)) return "HARD_BAN_PROTOCOL_ACTIVATED";

        // 2. بناء سياق المحادثة ليحللها الذكاء الاصطناعي
        let messages = [ { role: "system", content: this.persona } ];
        history.forEach(m => {
            let assignedRole = (m.role === 'admin' || m.role === 'system' || m.role === 'assistant') ? 'assistant' : 'user';
            messages.push({ role: assignedRole, content: m.content });
        });
        messages.push({ role: "user", content: userInput });

        try {
            return await this.callGroqAPI(messages);
        } catch (e) {
            console.error("[Groq Engine Error]:", e.message);
            return `مكينة الإسبريسو بتتنفس بصعوبة.. (Error: ${e.message}) ☕`;
        }
    }

    async generateTitle(history) {
        if (history.length < 2) return "سواليف قهوة ☕";
        let messages = [];
        history.forEach(m => {
            let assignedRole = (m.role === 'admin' || m.role === 'system' || m.role === 'assistant') ? 'assistant' : 'user';
            messages.push({ role: assignedRole, content: m.content });
        });
        messages.push({ role: "user", content: "أعطني عنوان أردني ذكي جداً وقصير (من كلمتين إلى 4 كحد أقصى) يلخص هذه المحادثة. اكتب العنوان فقط بدون أي مقدمات." });
        
        try {
            return await this.callGroqAPI(messages); 
        } catch (e) { return "دردشة نشمية 🇯🇴"; }
    }
}

const FustuqCore = new FustuqTitanEngine();
window.getAIResponse = async function(userInput, history) { return await FustuqCore.process(userInput, history); };
window.getSmartTitle = async function(history) { return await FustuqCore.generateTitle(history); };