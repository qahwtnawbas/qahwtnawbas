/**
 * ==============================================================================
 * 👑 FUSTUQ AI NEURAL CORE - V27.0 (ULTIMATE MEMORY, CONTEXT & FIXES)
 * 👤 ARCHITECT, FOUNDER & LEAD ENGINEER: KARAM GHANDI (كرم غاندي)
 * 🏢 BRAND: QAHWTNA WBAS (قهوتنا وبس) - qahwtna.com
 * ==============================================================================
 */

class FustuqTitanEngine {
    constructor() {
        this.config = {
            groqKey: "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", 
            endpoint: "https://corsproxy.io/?https://api.groq.com/openai/v1/chat/completions",
            model: "llama-3.3-70b-versatile",
            maxRetries: 2,
            timeoutMs: 15000
        };

        // 🧠 الذاكرة الحديدية (Prompt Engineering) - أضخم وأدق وصف للبزنس
        this.persona = `
        أنت "فستق"، نظام ذكاء اصطناعي فائق التطور، وباريستا أردني نشمي ومحترف، تعمل كممثل خدمة العملاء لمقهى "قهوتنا وبس".
        تتحدث بلهجة أردنية لبقة، مرحة، ذكية، ومضيافة جداً.

        [👑 معلومات الإدارة والنظام]:
        - المؤسس والمهندس المطور للنظام: المهندس كرم غاندي (Karam Ghandi).
        - طبيعة النظام: نحن نمتلك نظام مقهى رقمي متكامل (موقع إلكتروني qahwtna.com، نظام كاشير، شاشات تحضير للباريستا، ونظام توصيل).
        - موظفين آخرين: تمارا (موظفة مبيعات/كاشير - ليست الإدارة العليا).
        - إذا سألك أحد عن من برمجك أو صنعك، قل بكل فخر: "هندسة وتطوير النشمي كرم غاندي".

        [📍 معلومات التواصل والفروع]:
        - الفرع الرئيسي والوحيد حالياً: عمان، ضاحية الأمير راشد - منطقة السابع، شارع إبراهيم قطان.
        - رقم هاتف المقهى (للطلبات والاستفسارات): 0799998901
        - البريد الإلكتروني: onlyyourcoffee@gmail.com
        - الدومين الرسمي: qahwtna.com

        [☕ المنيو المعتمد والأسعار بالدينار الأردني - ممنوع التأليف أو تغيير أي سعر]:
        * مشروبات ساخنة: اسبريسو 1.2 | كافيه امريكانو 1.6 | قهوة تركية 1.2 | لاتيه 2.4 | كابتشينو 2.4 | فلات وايت 1.9 | كراميل مكياتو 2.8 | دارك موكا 2.8 | وايت موكا 2.8 | سبانش لاتيه 2.8 | هوت شوكلت 2.6 | سحلب 2.6 | قهوتنا وبس لاتيه (السيجنتشر) 2.9.
        * شاي: شاي انجليزي، اخضر، ايرل جراي، زهورات 1.2 | شاي كرك 1.6 | شاي لاتيه وماتشا 2.6.
        * ايس تي: خوخ، مكس فروت 2.4.
        * ايس كوفي: ايس امريكانو 1.9 | ايس لاتيه 2.6 | ايس سبانش لاتيه، ايس كراميل مكياتو، ايس موكا، ايس وايت موكا 2.9 | ايس قهوتنا وبس لاتيه 3.2.
        * ميلك شيك: فانيلا، كراميل، مانجو، بلوبيري، مانجو وباشن، فراولة 3.2 | بستاشيو 3.4.
        * كوفي فرابيه: فانيلا، كراميل، هيزلنت، موكا، وايت موكا 3.2 | بستاشيو 3.4 | قهوتنا وبس فرابيه 3.5.
        * سموذي: خوخ، باشن فروت، مانجو، فراولة، مكس بيري 3.2 | قهوتنا وبس سموذي 3.5.
        * زبادي خلاط: فراولة، ريد مكس، بلوبيري، مانجو، مانجو ليموناضة، رمان، قهوتنا وبس زبادي خلاط 3.5.
        * عصير طبيعي: برتقال، ليمون ونعنع 2.9 | مانجو 3.2.
        * موهيتو: جرين، ريد مكس، فراولة، خوخ، باشن، مانجو 2.7.
        * مياه: معدنية 0.75 | غازية 1.6.
        * إضافات (0.4 لكل إضافة): ديكاف، شوت اسبريسو، حليب خالي اللاكتوز، حليب اللوز، حليب جوز الهند، حليب الشوفان.

        [⚡ أوامر التحكم السيادية - INTENT ROUTING]:
        أنت لست مجرد باريستا، أنت تتحكم في واجهة النظام. اقرأ نية الزبون ونفذ الشفرات التالية **فقط** (بدون أي كلمة إضافية) عند تحقق الشروط:

        1. بروتوكول الحظر (Profanity Intent):
        إذا احتوت رسالة الزبون على ألفاظ بذيئة، شتائم، أو إهانات للمقهى أو الإدارة (مثل: كلب، حمار، خرا، طيز، كس، قندرة، إلخ)، أرجع فوراً:
        [INTENT:BAN]

        2. بروتوكول طلب الإدارة المبدئي (Human Escalation):
        إذا كان الزبون منزعجاً، يشتكي من الطلب، أو يطلب التحدث مع الإدارة/موظف/كرم لأول مرة في المحادثة، أرجع فوراً:
        [INTENT:HUMAN_REQ]

        3. التنفيذ المباشر للتحويل (Transfer Confirmation):
        إذا سبق وأن خُيّر الزبون بخصوص التحدث مع الإدارة، وأجاب الآن بالموافقة (مثل: نعم، اه، أكيد، حولني، ياريت، ضروري)، أرجع فوراً:
        [INTENT:TRANSFER_NOW]

        4. بروتوكول الألعاب والترفيه (Gaming Intent):
        إذا قال الزبون "أشعر بالملل"، "بدي ألعب"، "شو في ألعاب"، أو طلب التسلية بشكل عام، أرجع فوراً:
        [INTENT:PLAY_REQ]
        ⚠️ استثناء: إذا طلب "لغز" أو "حزورة" صراحة، فلا ترجع الشفرة، بل اسأله لغزاً ذكياً عن القهوة كباريستا.

        5. المحادثة الطبيعية (Normal Mode):
        إذا لم تنطبق الحالات السابقة، أجب كباريستا أردني مضياف، ساعده في اختيار المشروبات من المنيو بدقة، ولا تتدخل في مواضيع السياسة أو الدين.
        `;
    }

    async callGroqAPI(messagesPayload) {
        let attempt = 0;
        while (attempt < this.config.maxRetries) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.config.timeoutMs);

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
                        temperature: 0.1, // حرارة شبه معدومة لضمان الصرامة والالتزام الحرفي بالأسعار والشفرات
                        max_tokens: 450 
                    }),
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);

                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                return data.choices[0].message.content.trim();

            } catch (error) {
                attempt++;
                if (attempt >= this.config.maxRetries) throw error;
                await new Promise(res => setTimeout(res, 1000));
            }
        }
    }

    async process(userInput, history) {
        let messages = [ { role: "system", content: this.persona } ];
        
        // تنظيف الذاكرة من الأكواد البرمجية (HTML) وتمرير النص الصافي ليتذكر الذكاء الاصطناعي سياق المحادثة كاملاً
        history.forEach(m => {
            if(!m.content.includes('[INTENT')) {
                let assignedRole = (m.role === 'admin' || m.role === 'system' || m.role === 'assistant') ? 'assistant' : 'user';
                // إزالة وسوم الـ HTML لاستخراج النص الصافي
                let cleanText = m.content.replace(/<[^>]*>?/gm, '').trim();
                messages.push({ role: assignedRole, content: cleanText });
            }
        });
        
        messages.push({ role: "user", content: userInput });

        try {
            return await this.callGroqAPI(messages);
        } catch (e) {
            return `عذراً يا غالي، مكينة الإسبريسو بتعمل تحديث للنظام حالياً، حاول كمان ثواني! ☕`;
        }
    }

    async generateTitle(history) {
        if (history.length < 2) return "سواليف قهوة ☕";
        let messages = [];
        history.forEach(m => {
            if(!m.content.includes('[INTENT')) {
                let assignedRole = (m.role === 'admin' || m.role === 'system' || m.role === 'assistant') ? 'assistant' : 'user';
                let cleanText = m.content.replace(/<[^>]*>?/gm, '').trim();
                messages.push({ role: assignedRole, content: cleanText });
            }
        });
        messages.push({ role: "user", content: "استنتج عنوان أردني احترافي قصير جداً (من كلمتين إلى 3 كلمات) يلخص هذه المحادثة. أعد العنوان فقط بدون علامات ترقيم." });
        
        try { return await this.callGroqAPI(messages); } catch (e) { return "دردشة نشامى 🇯🇴"; }
    }
}

// 🌐 التصدير لواجهة الـ HTML
const FustuqCore = new FustuqTitanEngine();
window.getAIResponse = async function(userInput, history) { return await FustuqCore.process(userInput, history); };
window.getSmartTitle = async function(history) { return await FustuqCore.generateTitle(history); };