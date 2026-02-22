// ============================================================
//  PATHFINDER — Game Configuration Data
// ============================================================

const gameData = {

    // ── CAREERS ─────────────────────────────────────────────
    careers: [
        {
            id: 'programmer',
            title: "Dasturchi",
            icon: "fa-solid fa-laptop-code",
            color: "#6366f1",
            description: "Mantiqiy fikrlash va muammolarni hal qilish. Kelajak texnologiyalarini siz yaratasiz!",
            levels: ["Junior Dasturchi", "Middle Dasturchi", "Senior Dasturchi"],
            baseRates: { junior: 12, middle: 30, senior: 70 },
            // 4 required skills with icons and descriptions
            skills: [
                { id: "matematika", label: "Matematika", icon: "fa-solid fa-square-root-variable", desc: "Algoritmlar va hisob-kitob" },
                { id: "mantiq", label: "Mantiqiy fikr", icon: "fa-solid fa-brain", desc: "Muammoni bosqichma-bosqich yechish" },
                { id: "ingliz_tili", label: "Ingliz tili", icon: "fa-solid fa-language", desc: "Texnik hujjat va kod o'qish" },
                { id: "diqqat", label: "Diqqat/Sabr", icon: "fa-solid fa-eye", desc: "Xatosiz, sifatli kod yozish" }
            ],
            // Skill thresholds to unlock next level: [junior->middle, middle->senior]
            skillThresholds: [40, 80]
        },
        {
            id: 'designer',
            title: "Dizayner",
            icon: "fa-solid fa-pen-nib",
            color: "#ec4899",
            description: "Kreativlik va estetik duyg'u. Dunyoni chiroyli va qulay qilasiz!",
            levels: ["Junior Dizayner", "Middle Dizayner", "Senior Dizayner"],
            baseRates: { junior: 10, middle: 26, senior: 60 },
            skills: [
                { id: "kreativlik", label: "Kreativlik", icon: "fa-solid fa-lightbulb", desc: "Original g'oyalar yaratish" },
                { id: "san_at", label: "Tasviriy san'at", icon: "fa-solid fa-palette", desc: "Rangtasvirshunos asoslar" },
                { id: "geometriya", label: "Geometriya", icon: "fa-solid fa-shapes", desc: "Kompozitsiya va nisbat" },
                { id: "empatiya", label: "Empatiya", icon: "fa-solid fa-heart", desc: "Foydalanuvchini tushunish" }
            ],
            skillThresholds: [40, 80]
        },
        {
            id: 'doctor',
            title: "Shifokor",
            icon: "fa-solid fa-user-doctor",
            color: "#10b981",
            description: "Odamlarning salomatligi va hayoti siz qo'lingizda. Ulug' va mas'uliyatli kasb!",
            levels: ["Internatura", "Rezident Shifokor", "Bosh Shifokor"],
            baseRates: { junior: 8, middle: 32, senior: 85 },
            skills: [
                { id: "biologiya", label: "Biologiya", icon: "fa-solid fa-dna", desc: "Odam tanasi va a'zolar" },
                { id: "kimyo", label: "Kimyo", icon: "fa-solid fa-flask", desc: "Dorilar va moddalar" },
                { id: "matematika", label: "Matematika", icon: "fa-solid fa-square-root-variable", desc: "Dozalar va tahlil hisob-kitobi" },
                { id: "sabr_qat", label: "Sabr-qat'iyat", icon: "fa-solid fa-hand-holding-heart", desc: "Bemorlar bilan ishlash" }
            ],
            skillThresholds: [45, 85]
        },
        {
            id: 'marketer',
            title: "Marketing mutaxassisi",
            icon: "fa-solid fa-bullhorn",
            color: "#f59e0b",
            description: "Odamlarni tushunish va g'oyalarni to'g'ri yetkazish — bu sizning kuchingiz!",
            levels: ["Junior Marketer", "Brand Manager", "CMO (Bosh marketer)"],
            baseRates: { junior: 9, middle: 25, senior: 55 },
            skills: [
                { id: "ona_tili", label: "Ona tili", icon: "fa-solid fa-pen", desc: "Ishontiruvchi matn yozish" },
                { id: "psixologiya", label: "Psixologiya", icon: "fa-solid fa-brain", desc: "Xaridor xulqini o'rganish" },
                { id: "matematika_s", label: "Matematika", icon: "fa-solid fa-chart-line", desc: "Statistika va tahlil" },
                { id: "kreativlik_m", label: "Kreativlik", icon: "fa-solid fa-lightbulb", desc: "Original reklama g'oyalari" }
            ],
            skillThresholds: [40, 80]
        }
    ],

    // ── QUIZ BANK ────────────────────────────────────────────
    // Indexed by skill id. Each entry is an array of question objects.
    quizBank: {
        // PROGRAMMER skills
        "matematika": [
            { q: "x − 15 = 45 tenglamada x ni toping.", options: ["30", "50", "60", "75"], correct: 2, hint: "Tenglamaning ikkala tomoniga 15 qo'shing." },
            { q: "2⁵ (2 ning 5-darajasi) nechaga teng?", options: ["10", "16", "32", "64"], correct: 2, hint: "2×2×2×2×2 = ?" },
            { q: "To'g'ri burchakli uchburchakda: a=3, b=4 bo'lsa, gipotenuza c=?", options: ["5", "6", "7", "8"], correct: 0, hint: "Pifagor teoremasi: a² + b² = c²" },
            { q: "3x + 6 = 24 bo'lsa, x=?", options: ["4", "5", "6", "7"], correct: 2, hint: "Avval 6 ni o'ng tomonga o'tkazing." },
            { q: "100 ning 25% i nechaga teng?", options: ["15", "20", "25", "30"], correct: 2, hint: "25/100 × 100 = ?" },
            { q: "Agar kvadratning bir tomoni 5 bo'lsa, yuzasi necha?", options: ["10", "20", "25", "30"], correct: 2, hint: "Kvadrat yuzi = tomon²" },
            { q: "Sonlar qatori: 2, 4, 8, 16, ... keyingisi necha?", options: ["18", "24", "32", "36"], correct: 2, hint: "Har soni oldinginikidan 2 marta katta." },
        ],
        "mantiq": [
            { q: "Agar kecha chorshanba bo'lsa, ertangi kundan keyin qaysi kun bo'ladi?", options: ["Juma", "Shanba", "Payshanba", "Yakshanba"], correct: 1, hint: "Kecha = chorshanba → bugun = payshanba → ertaga = juma → ertangi kundan keyin = ..." },
            { q: "1 kg paxta og'irroqmi yoki 1 kg temir?", options: ["Temir", "Paxta", "Ikkalasi teng", "Bilmayman"], correct: 2, hint: "Ikkala ham 1 kilogramm." },
            { q: "Agar barcha mushuklar hayvon bo'lsa va ba'zi hayvonlar uchsa, demak...", options: ["Barcha mushuklar uchadi", "Ba'zi mushuklar uchadi", "Mushuklar uchmasligi mumkin", "Xulosa chiqarib bo'lmaydi"], correct: 3, hint: "Mantiqiy xulosani ehtiyotkorlik bilan chiqaring." },
            { q: "5 ta raqamdan eng kattagini toping: 3, 7, 1, 9, 4", options: ["7", "9", "4", "3"], correct: 1, hint: "Raqamlarni solishtiring." },
            { q: "Uchburchakning burchaklari yig'indisi nechaga teng?", options: ["90°", "180°", "270°", "360°"], correct: 1, hint: "Bu geometriyaning asosiy qoidasi." },
        ],
        "ingliz_tili": [
            { q: "'Software' so'zining o'zbek tarjimasi qaysi?", options: ["Qurilma", "Dastur", "Tarmoq", "Internet"], correct: 1, hint: "Dastur → kompyuter uchun yozilgan kod." },
            { q: "'Knowledge' so'zining o'zbek tarjimasi?", options: ["Kuch", "Bilim", "Imkoniyat", "Harakat"], correct: 1, hint: "Bu inglizchada 'bilim' ma'nosini beradi." },
            { q: "Noto'g'ri (Irregular) fe'lni aniqlang:", options: ["Play–Played", "Work–Worked", "Go–Went", "Look–Looked"], correct: 2, hint: "Irregular fe'llar -ed qabul qilmaydi." },
            { q: "'Debug' so'zi dasturlashda nima ma'noni anglatadi?", options: ["Yangi kod yozish", "Xatoni topib tuzatish", "Dasturni o'chirish", "Saqlash"], correct: 1, hint: "'Bug' = xato; 'debug' = xatoni yo'q qilish." },
            { q: "Inglizcha 'deadline' so'zining ma'nosi?", options: ["O'lik chiziq", "Muddatning so'nggi kuni", "Ish boshlanishi", "Dam olish"], correct: 1, hint: "Deadline = Vazifani topshirish muddati." },
        ],
        "diqqat": [
            { q: "Quyidagi sonlar qatorida noto'g'ri son qaysi? 2, 4, 6, 9, 10", options: ["4", "6", "9", "10"], correct: 2, hint: "Bu juft sonlar qatori." },
            { q: "10 ta tuxumdan 3 tasi yorilib ketsa, nechta butun tuxum qoladi?", options: ["7", "3", "10", "13"], correct: 0, hint: "10 − 3 = ?" },
            { q: "Bir poyezdga 100 yo'lovchi chiqdi, 40 tasi tushdi, 25 tasi mindi. Nechta yo'lovchi bor?", options: ["75", "85", "65", "80"], correct: 1, hint: "100 − 40 + 25 = ?" },
            { q: "Agar men har kuni 5 bet o'qisam, 30 betli kitobni necha kunda o'qib bo'laman?", options: ["5", "6", "7", "8"], correct: 1, hint: "30 ÷ 5 = ?" },
        ],

        // DESIGNER skills
        "kreativlik": [
            { q: "Dizayn uchun rang tanlashda birinchi nimani hisobga olasiz?", options: ["O'z sevimli rangingiz", "Auditoriya madaniyati va psixologiyasi", "Eng qimmat ranglar", "Tasodifiy"], correct: 1, hint: "Rang psixologiyasi muhim: har bir rang o'z hissiyotini beradi." },
            { q: "Yaxshi dizayn uchun eng muhim tamoyil qaysi?", options: ["Ko'p element ishlatish", "Oddiylik va aniqlik (Minimalizm)", "Yorqin ranglar", "Katta shrift"], correct: 1, hint: "Yaxshi dizayn – ortiqchasiz dizayn." },
            { q: "'Brainstorming' nima?", options: ["Miya tahlili", "G'oyalar tufoni", "Dizayn dasturi", "Rasm chizish"], correct: 1, hint: "Inglizcha 'brain' = miya, 'storm' = bo'ron." },
        ],
        "san_at": [
            { q: "Asosiy (birlamchi) ranglar qaysilar?", options: ["Qizil, yashil, sariq", "Qizil, ko'k, sariq", "Oq, qora, kulrang", "Yashil, ko'k, binafsha"], correct: 1, hint: "Ular aralashmasdan hosil bo'ladi." },
            { q: "Quyidagi rassomlardan qaysi biri O'zbekistonlik?", options: ["Pablo Pikasso", "Leonardo da Vinchi", "Chingiz Axmarov", "Salvador Dali"], correct: 2, hint: "U O'zbekiston tasviriy san'atining ulug' namoyandasi." },
            { q: "Perspektiva (chuqurlik hissi) dizaynda nimani anglatadi?", options: ["Ranglar jilosi", "Olisni yaqin ko'rsatish usuli", "Rasmning kattaligi", "Chiziqlar bosimi"], correct: 1, hint: "Ko'zga 3D effekt yaratish usuli." },
        ],
        "geometriya": [
            { q: "Doira yuzasi formulasi qaysi?", options: ["2πr", "πr²", "πd", "r²"], correct: 1, hint: "π = 3.14 va r = radius." },
            { q: "To'rtburchakning perimetri formulasi?", options: ["a × b", "2(a + b)", "a + b", "4a"], correct: 1, hint: "Perimetr = barcha tomonlar yig'indisi." },
            { q: "Simmetriya nima?", options: ["Shaklning ikki tomoni bir-birining oynasi", "Ranglar uyg'unligi", "Shakl kattaligi", "Chiziq qalinligi"], correct: 0, hint: "Kapalak qanotlari – simmetriyaning misoli." },
        ],
        "empatiya": [
            { q: "UX dizaynda 'User' (foydalanuvchi) kimni anglatadi?", options: ["Dizayner", "Dasturchi", "Mahsulotdan foydalanadigan kishi", "Mijoz"], correct: 2, hint: "UX = User Experience = Foydalanuvchi tajribasi." },
            { q: "Empatiyaning asosiy ma'nosi?", options: ["O'zini ko'rsatmoq", "Boshqalarning his-tuyg'usini tushunish", "Tez karor qilish", "Rejalashtirish"], correct: 1, hint: "Yaxshi dizayner foydalanuvchi o'rniga o'zini qo'ya oladi." },
        ],

        // DOCTOR skills
        "biologiya": [
            { q: "Odam qonidagi eng ko'p hujayra turi qaysi?", options: ["Oq qon tanachalari", "Trombositlar", "Qizil qon tanachalari", "Plazma"], correct: 2, hint: "Ular kislorod tashiydi." },
            { q: "Hujayraning 'quvvat manbai' qaysi organella?", options: ["Yadro", "Mitoxondriya", "Sitoplazma", "Ribosoma"], correct: 1, hint: "Mitoxondriya ~ 'elektr stansiyasi'." },
            { q: "Odam organizmidagi eng katta a'zo qaysi?", options: ["Jigar", "O'pka", "Teri", "Miyak"], correct: 2, hint: "U butun tana yuzasini qoplaydi." },
            { q: "DNK nima?", options: ["Dori nomi", "Irsiy ma'lumot tashuvchi molekula", "Oqsil turi", "Gormon"], correct: 1, hint: "Irsiyat va hujayra dasturi shu yerda." },
            { q: "Yurak necha kameradan iborat?", options: ["2", "3", "4", "5"], correct: 2, hint: "2 bo'lmachа + 2 qorincha." },
        ],
        "kimyo": [
            { q: "Suvning kimyoviy formulasi?", options: ["CO₂", "H₂O", "O₂", "H₂O₂"], correct: 1, hint: "2 vodorod + 1 kislorod atomi." },
            { q: "Mendeleyev davriy jadvalidagi birinchi element?", options: ["Kislorod", "Geliy", "Vodorod", "Azot"], correct: 2, hint: "U eng yengil element." },
            { q: "Neytral muhitning pH qiymati?", options: ["0", "7", "14", "5"], correct: 1, hint: "Kislotali < 7 < Ishqoriy." },
            { q: "Qaysi gaz o'simliklarning fotosintezi uchun kerak?", options: ["O₂", "N₂", "CO₂", "H₂S"], correct: 2, hint: "O'simliklar uni yutib, kislorod chiqaradi." },
        ],
        "matematika_d": [
            { q: "Bemorga kuniga 3 marta dori berilsa, 7 kunda necha marta beriladi?", options: ["18", "21", "24", "14"], correct: 1, hint: "3 × 7 = ?" },
            { q: "60 ml dozaning 50% i necha ml?", options: ["20", "25", "30", "40"], correct: 2, hint: "60 × 0.5 = ?" },
        ],
        "sabr_qat": [
            { q: "Bemor shifokorni kutib charchagan. Siz nima qilasiz?", options: ["E'tibor bermaysiz", "Kechirim so'rab, ahvolini so'raysiz", "Tez-tez qaytib kelishini aytasiz", "Navbatdan chiqarasiz"], correct: 1, hint: "Empатiya va profesionallik." },
            { q: "Qiyin operatsiyadan oldin stress boshqarish uchun qaysi usul tavsiya etiladi?", options: ["Ovozingizni ko'taring", "Chuqur nafas oling va reja tuzing", "Hamkasb bilan bahslashing", "Operatsiyani bekor qiling"], correct: 1, hint: "Tinch qol, diqqatni jamla." },
        ],

        // MARKETER skills
        "ona_tili": [
            { q: "Alisher Navoiyning mashhur asari qaysi?", options: ["Boburnoma", "Xamsa", "O'tkan kunlar", "Qutadg'u bilig"], correct: 1, hint: "5 dostonden iborat buyuk asar." },
            { q: "'Reklama matni' yozishda birinchi qoida nima?", options: ["Uzun va batafsil yozish", "Oddiy, aniq va e'tiborni jalb qiladigan bo'lish", "Chiroyli so'zlar ishlatish", "Ko'proq imzo qo'yish"], correct: 1, hint: "Mahsulotni 3 soniyada tushuntir." },
            { q: "Sinonim so'z nima?", options: ["Qarama-qarshi ma'nodagi so'z", "Bir xil ma'nodagi so'z", "Yangi ixtiro qilingan so'z", "Chet el so'zi"], correct: 1, hint: "Masalan: katta = ulkan = yirik." },
        ],
        "psixologiya": [
            { q: "Iste'molchi nima uchun mahsulot sotib oladi?", options: ["Faqat narxi uchun", "Ehtiyoji yoki ishtiyoqi uchun", "Reklamaning rangi uchun", "Do'konning nomi uchun"], correct: 1, hint: "Marketing asosi: ehtiyoj va xohish." },
            { q: "Qizil rang reklamada ko'pincha qanday hissiyot uyg'otadi?", options: ["Xotirjamlik", "Shoshilinchlik va energia", "Ishonch", "Qayg'u"], correct: 1, hint: "Qizil = diqqat, energiya, shoshilinch." },
            { q: "Ijtimoiy isbotlash (Social Proof) nima?", options: ["Mahsulotni tanishga tavsiya qilish", "Boshqalar foydalanganini ko'rsatish", "Narxni oshirish", "Reklama qilish"], correct: 1, hint: "'Ming kishi foydalanmoqda!' — bu social proof." },
        ],
        "matematika_s": [
            { q: "200 ta kishi saytga kirdi, 20 tasi mahsulot sotib oldi. Konversiya qancha?", options: ["5%", "10%", "20%", "15%"], correct: 1, hint: "Konversiya = (xaridorlar / tashrufchilar) × 100" },
            { q: "Reklama kampaniyasiga 500$ sarflandi, 1500$ daromad olindi. ROI qancha?", options: ["100%", "150%", "200%", "300%"], correct: 2, hint: "ROI = ((daromad - xarajat) / xarajat) × 100" },
        ],
        "kreativlik_m": [
            { q: "Eng yaxshi marketing g'oyasi qayerdan keladi?", options: ["Faqat kitoblardan", "Faqat tajribadan", "Hayot, muammolar va odamlarni kuzatishdan", "Raqiblarni ko'chirish orqali"], correct: 2, hint: "Ijodiy kishi hamma joydan ilhom oladi." },
            { q: "Viral kontent nima?", options: ["Yuqumli kasallik haqida video", "Tez tarqaladigan, ko'plab ulashiladigan kontent", "Reklama bannerи", "Mahsulot narxnomasi"], correct: 1, hint: "Viral = tarqalib ketadigan, mashhur bo'ladigan." },
        ]
    },

    // ── RANDOM CAREER EVENTS ─────────────────────────────────
    // Fires randomly during advanceTime. Each has a career filter (or 'all'),
    // a description, and effect on resources.
    careerEvents: [
        // — Universal events —
        {
            id: "good_mood",
            careers: "all",
            emoji: "😊",
            title: "Yaxshi kun!",
            desc: "Bugun hamma narsa joyida. Siz juda samarali ishlayapsiz.",
            effect: { energy: +15, stress: -10, money: 0 },
            type: "good"
        },
        {
            id: "hard_week",
            careers: "all",
            emoji: "😮‍💨",
            title: "Og'ir hafta",
            desc: "Bu hafta juda ko'p tazyiq bo'ldi. O'zingizga e'tibor bering.",
            effect: { energy: -15, stress: +20, money: 0 },
            type: "bad"
        },
        {
            id: "bonus",
            careers: "all",
            emoji: "🎁",
            title: "Mukofot!",
            desc: "Menejer sizning mehnatingiizni ko'rib — qo'shimcha mukofot berdi!",
            effect: { energy: +5, stress: -5, money: 50 },
            type: "good"
        },
        {
            id: "friend_help",
            careers: "all",
            emoji: "🤝",
            title: "Do'st yordami",
            desc: "Do'stingiz qiyin paytda yordam qildi. Stress kamaydi.",
            effect: { energy: +10, stress: -20, money: 0 },
            type: "good"
        },
        {
            id: "traffic",
            careers: "all",
            emoji: "🚗",
            title: "Tiqilinchda qoldingiz",
            desc: "Ishga kechikdingiz. Menejer norozi. Stress oshdi.",
            effect: { energy: -5, stress: +15, money: -15 },
            type: "bad"
        },
        {
            id: "sick_day",
            careers: "all",
            emoji: "🤒",
            title: "Kasalxana",
            desc: "Bir oz kasal bo'ldingiz. Dam olishingizga to'g'ri keldi.",
            effect: { energy: -20, stress: +10, money: -30 },
            type: "bad"
        },
        // — Programmer specific —
        {
            id: "prod_bug",
            careers: ["programmer"],
            emoji: "🐛",
            title: "Serverdagi qo'ng'iroq!",
            desc: "Tunda mijoz qo'ng'iroq qildi: saytda katta xatolik! Siz yechtingiz, lekin uxlamadingiz.",
            effect: { energy: -25, stress: +25, money: +80 },
            type: "neutral"
        },
        {
            id: "hackathon",
            careers: ["programmer"],
            emoji: "💻",
            title: "Hackathon g'alabasi!",
            desc: "Jamoangiz bilan hakathon o'tkazdingiz va 2-o'rinni egalladi!",
            effect: { energy: -10, stress: -5, money: +100 },
            type: "good"
        },
        // — Designer specific —
        {
            id: "client_rejected",
            careers: ["designer"],
            emoji: "😤",
            title: "Mijoz rad qildi",
            desc: "5 kun ishlaganingizni mijoz yoqtirmadi. Yangisini qilishingiz kerak.",
            effect: { energy: -15, stress: +30, money: 0 },
            type: "bad"
        },
        {
            id: "award",
            careers: ["designer"],
            emoji: "🏆",
            title: "Tanlov g'olibisiz!",
            desc: "Dizayn tanlovida ishingiz birinchi o'rinni egalladi!",
            effect: { energy: +10, stress: -15, money: +120 },
            type: "good"
        },
        // — Doctor specific —
        {
            id: "emergency",
            careers: ["doctor"],
            emoji: "🚨",
            title: "Favqulodda holat!",
            desc: "Kechasi favqulodda shoshilinch operatsiya bo'ldi. Siz bemoringizni qutqardingiz!",
            effect: { energy: -30, stress: +20, money: +150 },
            type: "neutral"
        },
        {
            id: "grateful_patient",
            careers: ["doctor"],
            emoji: "🌸",
            title: "Minnatdor bemor",
            desc: "Bir hafta avval davolagan bemorингиз shifo topib, sizga minnatdorlik xati yozdi.",
            effect: { energy: +15, stress: -25, money: 0 },
            type: "good"
        },
        // — Marketer specific —
        {
            id: "viral_campaign",
            careers: ["marketer"],
            emoji: "🚀",
            title: "Viral kampaniya!",
            desc: "Siz tayyorlagan reklama ijtimoiy tarmoqlarda viral bo'ldi. Kompaniya sizni maqtaydi!",
            effect: { energy: 0, stress: -10, money: +100 },
            type: "good"
        },
        {
            id: "wrong_target",
            careers: ["marketer"],
            emoji: "📉",
            title: "Noto'g'ri auditoriya",
            desc: "Kampaniya noto'g'ri odamlarga ko'rsatildi. Natija yomon bo'ldi.",
            effect: { energy: -10, stress: +20, money: -50 },
            type: "bad"
        }
    ]
};
