// ============================================================
//  PATHFINDER — 20 Careers + Events
// ============================================================
const gameData = {
    careers: [
        {
            id: 'programmer', title: "Dasturchi", icon: "fa-solid fa-laptop-code", color: "#6366f1",
            description: "Mantiqiy fikrlash va muammolarni hal qilish. Kelajak texnologiyalarini siz yaratasiz!",
            levels: ["Junior Dasturchi", "Middle Dasturchi", "Senior Dasturchi"],
            baseRates: { junior: 12, middle: 30, senior: 70 },
            skills: [
                { id: "matematika", label: "Matematika", icon: "fa-solid fa-square-root-variable", desc: "Algoritmlar va hisob-kitob" },
                { id: "mantiq", label: "Mantiqiy fikr", icon: "fa-solid fa-brain", desc: "Muammoni bosqichma-bosqich yechish" },
                { id: "ingliz_tili", label: "Ingliz tili", icon: "fa-solid fa-language", desc: "Texnik hujjat va kod o'qish" },
                { id: "diqqat", label: "Diqqat/Sabr", icon: "fa-solid fa-eye", desc: "Xatosiz, sifatli kod yozish" }
            ], skillThresholds: [40, 80]
        },
        {
            id: 'designer', title: "Dizayner", icon: "fa-solid fa-pen-nib", color: "#ec4899",
            description: "Kreativlik va estetik duyg'u. Dunyoni chiroyli va qulay qilasiz!",
            levels: ["Junior Dizayner", "Middle Dizayner", "Senior Dizayner"],
            baseRates: { junior: 10, middle: 26, senior: 60 },
            skills: [
                { id: "kreativlik", label: "Kreativlik", icon: "fa-solid fa-lightbulb", desc: "Original g'oyalar yaratish" },
                { id: "san_at", label: "Tasviriy san'at", icon: "fa-solid fa-palette", desc: "Rangtasvir asoslari" },
                { id: "geometriya", label: "Geometriya", icon: "fa-solid fa-shapes", desc: "Kompozitsiya va nisbat" },
                { id: "empatiya", label: "Empatiya", icon: "fa-solid fa-heart", desc: "Foydalanuvchini tushunish" }
            ], skillThresholds: [40, 80]
        },
        {
            id: 'doctor', title: "Shifokor", icon: "fa-solid fa-user-doctor", color: "#10b981",
            description: "Odamlarning salomatligi va hayoti siz qo'lingizda. Ulug' va mas'uliyatli kasb!",
            levels: ["Internatura", "Rezident Shifokor", "Bosh Shifokor"],
            baseRates: { junior: 8, middle: 32, senior: 85 },
            skills: [
                { id: "biologiya", label: "Biologiya", icon: "fa-solid fa-dna", desc: "Odam tanasi va a'zolar" },
                { id: "kimyo", label: "Kimyo", icon: "fa-solid fa-flask", desc: "Dorilar va moddalar" },
                { id: "matematika", label: "Matematika", icon: "fa-solid fa-square-root-variable", desc: "Doza hisob-kitobi" },
                { id: "sabr_qat", label: "Sabr-qat'iyat", icon: "fa-solid fa-hand-holding-heart", desc: "Bemorlar bilan ishlash" }
            ], skillThresholds: [45, 85]
        },
        {
            id: 'marketer', title: "Marketer", icon: "fa-solid fa-bullhorn", color: "#f59e0b",
            description: "Odamlarni tushunish va g'oyalarni to'g'ri yetkazish — bu sizning kuchingiz!",
            levels: ["Junior Marketer", "Brand Manager", "CMO"],
            baseRates: { junior: 9, middle: 25, senior: 55 },
            skills: [
                { id: "ona_tili", label: "Ona tili", icon: "fa-solid fa-pen", desc: "Ishontiruvchi matn yozish" },
                { id: "psixologiya", label: "Psixologiya", icon: "fa-solid fa-brain", desc: "Xaridor xulqini o'rganish" },
                { id: "matematika", label: "Matematika", icon: "fa-solid fa-chart-line", desc: "Statistika va tahlil" },
                { id: "kreativlik", label: "Kreativlik", icon: "fa-solid fa-lightbulb", desc: "Original reklama g'oyalari" }
            ], skillThresholds: [40, 80]
        },
        {
            id: 'engineer', title: "Muhandis", icon: "fa-solid fa-gear", color: "#64748b",
            description: "Qurilmalar, inshootlar va sistemalarni loyihalash. Dunyoni qurish!",
            levels: ["Junior Muhandis", "Loyiha Muhandisi", "Bosh Muhandis"],
            baseRates: { junior: 11, middle: 28, senior: 65 },
            skills: [
                { id: "fizika", label: "Fizika", icon: "fa-solid fa-atom", desc: "Kuch, harakatlanish, energiya" },
                { id: "matematika", label: "Matematika", icon: "fa-solid fa-square-root-variable", desc: "Formulalar va hisob-kitob" },
                { id: "chizmachilik", label: "Chizmachilik", icon: "fa-solid fa-ruler-combined", desc: "Texnik chizmalarni o'qish" },
                { id: "mantiq", label: "Mantiqiy fikr", icon: "fa-solid fa-brain", desc: "Muhandislik tafakkuri" }
            ], skillThresholds: [40, 80]
        },
        {
            id: 'teacher', title: "O'qituvchi", icon: "fa-solid fa-chalkboard-user", color: "#0ea5e9",
            description: "Bilim ulashish — insoniyatning eng oliy amali. Avlodlarni tarbiyalaysiz!",
            levels: ["Yangi O'qituvchi", "Tajribali O'qituvchi", "Ustozlar Ustozi"],
            baseRates: { junior: 7, middle: 18, senior: 40 },
            skills: [
                { id: "pedagogika", label: "Pedagogika", icon: "fa-solid fa-book-open-reader", desc: "Ta'lim metodlari" },
                { id: "ona_tili", label: "Ona tili", icon: "fa-solid fa-pen", desc: "Aniq va ravshan gapirish" },
                { id: "psixologiya", label: "Psixologiya", icon: "fa-solid fa-brain", desc: "O'quvchi psixologiyasi" },
                { id: "sabr_qat", label: "Sabr", icon: "fa-solid fa-hand-holding-heart", desc: "Chidamlilik va mehribonlik" }
            ], skillThresholds: [35, 70]
        },
        {
            id: 'architect', title: "Arxitektor", icon: "fa-solid fa-building-columns", color: "#a78bfa",
            description: "Binolar va shaharlarni loyihalash. Estetika va muhandislikning uyg'unligi!",
            levels: ["Junior Arxitektor", "Loyihachi", "Bosh Arxitektor"],
            baseRates: { junior: 10, middle: 27, senior: 62 },
            skills: [
                { id: "geometriya", label: "Geometriya", icon: "fa-solid fa-shapes", desc: "Fazoviy tafakkur" },
                { id: "fizika", label: "Fizika", icon: "fa-solid fa-atom", desc: "Qurilish materiali xossalari" },
                { id: "kreativlik", label: "Kreativlik", icon: "fa-solid fa-lightbulb", desc: "Innovatsion loyihalar" },
                { id: "chizmachilik", label: "Chizmachilik", icon: "fa-solid fa-ruler-combined", desc: "Arxitektura chizmalari" }
            ], skillThresholds: [40, 80]
        },
        {
            id: 'economist', title: "Iqtisodchi", icon: "fa-solid fa-chart-pie", color: "#f97316",
            description: "Iqtisodiyot va moliya qonuniyatlarini o'rganish va tahlil qilish.",
            levels: ["Tahlilchi", "Katta Tahlilchi", "Bosh Iqtisodchi"],
            baseRates: { junior: 10, middle: 26, senior: 60 },
            skills: [
                { id: "matematika", label: "Matematika", icon: "fa-solid fa-square-root-variable", desc: "Iqtisodiy modellar" },
                { id: "iqtisod", label: "Iqtisod", icon: "fa-solid fa-coins", desc: "Bozor qonuniyatlari" },
                { id: "tarix", label: "Tarix", icon: "fa-solid fa-landmark", desc: "Iqtisodiy tarix" },
                { id: "mantiq", label: "Mantiq", icon: "fa-solid fa-brain", desc: "Tahliliy tafakkur" }
            ], skillThresholds: [40, 80]
        },
        {
            id: 'lawyer', title: "Yurist", icon: "fa-solid fa-scale-balanced", color: "#78716c",
            description: "Qonun va adolat uchun kurashuvchi. Jamiyatning himoyachisi!",
            levels: ["Stajyor Yurist", "Advokat", "Bosh Advokat"],
            baseRates: { junior: 9, middle: 28, senior: 68 },
            skills: [
                { id: "ona_tili", label: "Ona tili", icon: "fa-solid fa-pen", desc: "Huquqiy hujjatlar tili" },
                { id: "tarix", label: "Tarix", icon: "fa-solid fa-landmark", desc: "Qonunchilik tarixi" },
                { id: "mantiq", label: "Mantiq", icon: "fa-solid fa-brain", desc: "Argumentatsiya" },
                { id: "diqqat", label: "Diqqat", icon: "fa-solid fa-eye", desc: "Batafsil o'qish va xatolarga e'tibor" }
            ], skillThresholds: [40, 80]
        },
        {
            id: 'journalist', title: "Jurnalist", icon: "fa-solid fa-newspaper", color: "#e11d48",
            description: "Dunyo yangiliglarini xalqqa yetkazish. Haqiqat himoyachisi!",
            levels: ["Muxbir", "Ikkinchi toifa Jurnalist", "Bosh Muharrir"],
            baseRates: { junior: 8, middle: 22, senior: 50 },
            skills: [
                { id: "ona_tili", label: "Ona tili", icon: "fa-solid fa-pen", desc: "Yorqin va aniq yozuv" },
                { id: "ingliz_tili", label: "Ingliz tili", icon: "fa-solid fa-language", desc: "Xalqaro manbalardan foydalanish" },
                { id: "kreativlik", label: "Kreativlik", icon: "fa-solid fa-lightbulb", desc: "Qiziqarli sarlavhalar" },
                { id: "geografiya", label: "Geografiya", icon: "fa-solid fa-globe", desc: "Dunyo siyosatini tushunish" }
            ], skillThresholds: [35, 70]
        },
        {
            id: 'psychologist', title: "Psixolog", icon: "fa-solid fa-head-side-brain", color: "#d946ef",
            description: "Inson his-tuyg'ulari va xulqini o'rganish. Qalblarga 'dorivor' bo'lish!",
            levels: ["Psixolog-Praktikant", "Psixolog", "Kliniq Psixolog"],
            baseRates: { junior: 9, middle: 24, senior: 58 },
            skills: [
                { id: "psixologiya", label: "Psixologiya", icon: "fa-solid fa-brain", desc: "Inson xulq-atvori" },
                { id: "biologiya", label: "Biologiya", icon: "fa-solid fa-dna", desc: "Miya va asab tizimi" },
                { id: "empatiya", label: "Empatiya", icon: "fa-solid fa-heart", desc: "Boshqalarni tushunish" },
                { id: "tarix", label: "Tarix", icon: "fa-solid fa-landmark", desc: "Psixologiya tarixi va maktablari" }
            ], skillThresholds: [40, 80]
        },
        {
            id: 'photographer', title: "Fotograf", icon: "fa-solid fa-camera", color: "#06b6d4",
            description: "Hayot lahzalarini abadiylashtirish. Ko'zingiz — san'at asbobi!",
            levels: ["Fotograf Yordakchi", "Fotograf", "Ustoz Fotograf"],
            baseRates: { junior: 8, middle: 20, senior: 48 },
            skills: [
                { id: "kreativlik", label: "Kreativlik", icon: "fa-solid fa-lightbulb", desc: "Kompozitsiya va badiiy ko'z" },
                { id: "fizika", label: "Fizika", icon: "fa-solid fa-atom", desc: "Yorug'lik, optika asoslari" },
                { id: "san_at", label: "Tasviriy san'at", icon: "fa-solid fa-palette", desc: "Rang va estetika" },
                { id: "diqqat", label: "Diqqat", icon: "fa-solid fa-eye", desc: "Detallar va moment ushlash" }
            ], skillThresholds: [35, 70]
        },
        {
            id: 'musician', title: "Musiqachi", icon: "fa-solid fa-music", color: "#f43f5e",
            description: "His-tuyg'ularni musiqa orqali ifodalash. San'atning qudratli tili!",
            levels: ["Musiqa Talabasi", "Ijrochi", "Virtuoz"],
            baseRates: { junior: 6, middle: 18, senior: 50 },
            skills: [
                { id: "musiqa", label: "Musiqa nazariyasi", icon: "fa-solid fa-music", desc: "Nota, ritm va akkordlar" },
                { id: "matematika", label: "Matematika", icon: "fa-solid fa-square-root-variable", desc: "Ritm va metr hisob-kitobi" },
                { id: "kreativlik", label: "Kreativlik", icon: "fa-solid fa-lightbulb", desc: "Kompozitsiya yaratish" },
                { id: "sabr_qat", label: "Sabr-mashq", icon: "fa-solid fa-hand-holding-heart", desc: "Kunlik mashq intizomi" }
            ], skillThresholds: [35, 70]
        },
        {
            id: 'athlete', title: "Sportchi", icon: "fa-solid fa-person-running", color: "#84cc16",
            description: "Jismoniy qobiliyat va ruhiy bardoshlik. Champion bo'lish uchun kuring!",
            levels: ["Yangi Sportchi", "Musobaqa Sportchisi", "Professional"],
            baseRates: { junior: 5, middle: 20, senior: 60 },
            skills: [
                { id: "biologiya", label: "Biologiya", icon: "fa-solid fa-dna", desc: "Odam tanasi va fiziologiya" },
                { id: "fizika", label: "Fizika", icon: "fa-solid fa-atom", desc: "Harakat va kuch qonunlari" },
                { id: "sabr_qat", label: "Chidamlilik", icon: "fa-solid fa-hand-holding-heart", desc: "Ruhiy va jismoniy chidamlilik" },
                { id: "matematika", label: "Matematika", icon: "fa-solid fa-square-root-variable", desc: "Statistika va natija tahlili" }
            ], skillThresholds: [35, 70]
        },
        {
            id: 'entrepreneur', title: "Tadbirkor", icon: "fa-solid fa-briefcase", color: "#22c55e",
            description: "O'z biznesingizni qurib, minglab odamlarga ish o'rni yaratish!",
            levels: ["Startup Asoschisi", "Kichik Biznes", "Yirik Tadbirkor"],
            baseRates: { junior: 5, middle: 35, senior: 100 },
            skills: [
                { id: "matematika", label: "Matematika", icon: "fa-solid fa-square-root-variable", desc: "Moliyaviy hisob-kitob" },
                { id: "psixologiya", label: "Psixologiya", icon: "fa-solid fa-brain", desc: "Mijozlar va hamkorlarni tushunish" },
                { id: "kreativlik", label: "Kreativlik", icon: "fa-solid fa-lightbulb", desc: "Innovatsion g'oyalar" },
                { id: "iqtisod", label: "Iqtisod", icon: "fa-solid fa-coins", desc: "Bozor va raqobat" }
            ], skillThresholds: [40, 80]
        },
        {
            id: 'data_scientist', title: "Data Scientist", icon: "fa-solid fa-chart-bar", color: "#818cf8",
            description: "Katta ma'lumotlardan qimmatli bilimlar olish. Kelajakni bashorat qilish!",
            levels: ["Junior Data Analyst", "Data Scientist", "Lead Data Scientist"],
            baseRates: { junior: 13, middle: 32, senior: 80 },
            skills: [
                { id: "matematika", label: "Matematika", icon: "fa-solid fa-square-root-variable", desc: "Ehtimollik va statistika" },
                { id: "mantiq", label: "Mantiq", icon: "fa-solid fa-brain", desc: "Ma'lumot tahlili" },
                { id: "ingliz_tili", label: "Ingliz tili", icon: "fa-solid fa-language", desc: "Ilmiy maqolalar o'qish" },
                { id: "statistika", label: "Statistika", icon: "fa-solid fa-chart-line", desc: "Regressionlar va modellar" }
            ], skillThresholds: [45, 85]
        },
        {
            id: 'cybersecurity', title: "Kiberxavfsizlik", icon: "fa-solid fa-shield-halved", color: "#0f766e",
            description: "Raqamli dunyo himoyachisi. Kiberhujumlardan mudofaa qilish!",
            levels: ["Security Analyst", "Penetration Tester", "Chief Security Officer"],
            baseRates: { junior: 14, middle: 34, senior: 82 },
            skills: [
                { id: "matematika", label: "Matematika", icon: "fa-solid fa-square-root-variable", desc: "Kriptografiya asoslari" },
                { id: "mantiq", label: "Mantiq", icon: "fa-solid fa-brain", desc: "Hacker tafakkuri" },
                { id: "ingliz_tili", label: "Ingliz tili", icon: "fa-solid fa-language", desc: "Xalqaro standartlar" },
                { id: "diqqat", label: "Diqqat", icon: "fa-solid fa-eye", desc: "Zaifliklarni topish" }
            ], skillThresholds: [45, 85]
        },
        {
            id: 'translator', title: "Tarjimon", icon: "fa-solid fa-comments", color: "#7c3aed",
            description: "Tillar o'rtasida ko'prik qurib, madaniyatlarni yaqinlashtirish!",
            levels: ["Stajyor Tarjimon", "Tarjimon", "Sinxron Tarjimon"],
            baseRates: { junior: 8, middle: 20, senior: 48 },
            skills: [
                { id: "ingliz_tili", label: "Ingliz tili", icon: "fa-solid fa-language", desc: "Professional darajada bilish" },
                { id: "ona_tili", label: "Ona tili", icon: "fa-solid fa-pen", desc: "Adabiy tarjima san'ati" },
                { id: "geografiya", label: "Geografiya", icon: "fa-solid fa-globe", desc: "Madaniyatlararo bilim" },
                { id: "empatiya", label: "Empatiya", icon: "fa-solid fa-heart", desc: "Muallifni his etish" }
            ], skillThresholds: [40, 80]
        },
        {
            id: 'agronomist', title: "Agronom", icon: "fa-solid fa-seedling", color: "#15803d",
            description: "Qishloq xo'jaligini rivojlantirish. Millionlarni boqish!",
            levels: ["Agronom Yordakchi", "Agronom", "Bosh Agronom"],
            baseRates: { junior: 7, middle: 18, senior: 42 },
            skills: [
                { id: "biologiya", label: "Biologiya", icon: "fa-solid fa-dna", desc: "O'simliklar biologiyasi" },
                { id: "kimyo", label: "Kimyo", icon: "fa-solid fa-flask", desc: "Tuproq va o'g'it kimyosi" },
                { id: "geografiya", label: "Geografiya", icon: "fa-solid fa-globe", desc: "Iqlim va tuproq turi" },
                { id: "fizika", label: "Fizika", icon: "fa-solid fa-atom", desc: "Qishloq mexanikasi" }
            ], skillThresholds: [35, 70]
        },
        {
            id: 'ecologist', title: "Ekolog", icon: "fa-solid fa-leaf", color: "#059669",
            description: "Tabiatni muhofaza qilish. Kelajak avlodlar uchun dunyoni asrash!",
            levels: ["Junior Ekolog", "Ekolog", "Bosh Ekolog"],
            baseRates: { junior: 8, middle: 20, senior: 45 },
            skills: [
                { id: "biologiya", label: "Biologiya", icon: "fa-solid fa-dna", desc: "Ekotizimlar va tirik tabiat" },
                { id: "kimyo", label: "Kimyo", icon: "fa-solid fa-flask", desc: "Zaharli moddalar va ifloslanish" },
                { id: "geografiya", label: "Geografiya", icon: "fa-solid fa-globe", desc: "Iqlim o'zgarishi" },
                { id: "matematika", label: "Matematika", icon: "fa-solid fa-square-root-variable", desc: "Monitoring va tahlil" }
            ], skillThresholds: [35, 70]
        }
    ],

    careerEvents: [
        { id: "good_mood", careers: "all", emoji: "😊", title: "Yaxshi kun!", desc: "Bugun hamma narsa joyida. Siz juda samarali ishlayapsiz.", effect: { energy: +15, stress: -10, money: 0 }, type: "good" },
        { id: "hard_week", careers: "all", emoji: "😮‍💨", title: "Og'ir hafta", desc: "Bu hafta juda ko'p tazyiq bo'ldi. O'zingizga e'tibor bering.", effect: { energy: -15, stress: +20, money: 0 }, type: "bad" },
        { id: "bonus", careers: "all", emoji: "🎁", title: "Mukofot!", desc: "Menejer sizning mehnatingizni ko'rib — qo'shimcha mukofot berdi!", effect: { energy: +5, stress: -5, money: 60 }, type: "good" },
        { id: "friend_help", careers: "all", emoji: "🤝", title: "Do'st yordami", desc: "Do'stingiz qiyin paytda yordam qildi.", effect: { energy: +10, stress: -20, money: 0 }, type: "good" },
        { id: "traffic", careers: "all", emoji: "🚗", title: "Tiqilinchda!", desc: "Ishga kechikdingiz. Menejer norozi.", effect: { energy: -5, stress: +15, money: -15 }, type: "bad" },
        { id: "sick_day", careers: "all", emoji: "🤒", title: "Kasal bo'ldingiz", desc: "Bir oz kasal bo'ldingiz. Dam olish kerak.", effect: { energy: -20, stress: +10, money: -30 }, type: "bad" },
        { id: "new_skill", careers: "all", emoji: "⭐", title: "Yangi bilim!", desc: "Kuchli maqola o'qidingiz — ilhomlandingiz!", effect: { energy: +5, stress: -5, money: 0 }, type: "good" },
        { id: "prod_bug", careers: ["programmer", "cybersecurity", "data_scientist"], emoji: "🐛", title: "Server xatoligi!", desc: "Tunda katta xatolik chiqdi. Siz yechtingiz, lekin uxlamadingiz.", effect: { energy: -25, stress: +25, money: +90 }, type: "neutral" },
        { id: "hackathon", careers: ["programmer", "data_scientist"], emoji: "💻", title: "Hackathon g'alabasi!", desc: "Jamoangiz 2-o'rinni egalladi!", effect: { energy: -10, stress: -5, money: +120 }, type: "good" },
        { id: "client_rej", careers: ["designer", "photographer"], emoji: "😤", title: "Mijoz rad qildi", desc: "5 kun ishni mijoz yoqtirmadi.", effect: { energy: -15, stress: +30, money: 0 }, type: "bad" },
        { id: "award", careers: ["designer", "photographer", "musician"], emoji: "🏆", title: "Tanlov g'olibisiz!", desc: "Siz birinchi o'rinni egalladi!", effect: { energy: +10, stress: -15, money: +130 }, type: "good" },
        { id: "emergency", careers: ["doctor"], emoji: "🚨", title: "Favqulodda holat!", desc: "Kechasi shoshilinch operatsiya. Bemoringiz qutuldi!", effect: { energy: -30, stress: +20, money: +160 }, type: "neutral" },
        { id: "grateful", careers: ["doctor", "psychologist", "teacher"], emoji: "🌸", title: "Minnatdor bemor", desc: "Bemorингиз shifo topib minnatdorlik xati yozdi.", effect: { energy: +15, stress: -25, money: 0 }, type: "good" },
        { id: "viral", careers: ["marketer", "journalist", "entrepreneur"], emoji: "🚀", title: "Viral kampaniya!", desc: "Reklama ijtimoiy tarmoqlarda viral bo'ldi!", effect: { energy: 0, stress: -10, money: +110 }, type: "good" },
        { id: "wrong_target", careers: ["marketer", "entrepreneur"], emoji: "📉", title: "Noto'g'ri auditoriya", desc: "Kampaniya noto'g'ri odamlarga ko'rsatildi.", effect: { energy: -10, stress: +20, money: -50 }, type: "bad" },
        { id: "lawsuit_win", careers: ["lawyer"], emoji: "⚖️", title: "Suddan g'alabа!", desc: "Mijozingiz suddan g'olib chiqdi!", effect: { energy: -5, stress: -15, money: +200 }, type: "good" },
        { id: "big_match", careers: ["athlete", "musician"], emoji: "🎯", title: "Katta musobaqa!", desc: "Yirik musobaqaga chaqirildingiz!", effect: { energy: -20, stress: +15, money: +150 }, type: "neutral" },
        { id: "harvest", careers: ["agronomist", "ecologist"], emoji: "🌾", title: "Mo'l hosil!", desc: "Bu mavsumda hosil rekord darajada bo'ldi!", effect: { energy: 0, stress: -10, money: +80 }, type: "good" },
        { id: "break_disc", careers: ["musician", "athlete"], emoji: "💪", title: "Burilish nuqtasi!", desc: "Mashq davomida yangi natijaga erishdingiz!", effect: { energy: -10, stress: 0, money: 0 }, type: "good" }
    ]
};
