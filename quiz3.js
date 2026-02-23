// quiz3.js — Qolgan fanlar uchun avtomorf baz yaratish
// gameData yuklangandan so'ng chaqirilishi kerak

if (typeof gameData !== 'undefined' && typeof quizBank !== 'undefined') {
    gameData.quizBank = quizBank; // Quiz1 va Quiz2 ni o'zlashtirish

    // Barcha kasblardagi skill id'larni to'plash
    const allSkills = new Set();
    gameData.careers.forEach(c => c.skills.forEach(s => allSkills.add(s.id)));

    allSkills.forEach(skillId => {
        if (!gameData.quizBank[skillId]) {
            gameData.quizBank[skillId] = [];
        }

        let count = gameData.quizBank[skillId].length;
        // Agar savollar soni 50 tadan kam bo'lsa, avtomatik to'ldirish
        for (let i = count; i < 50; i++) {
            let a = Math.floor(Math.random() * 50) + 1;
            let b = Math.floor(Math.random() * 50) + 1;
            let pOptions = ['+', '-', '*'];
            let op = pOptions[Math.floor(Math.random() * pOptions.length)];

            if (op === '*' && (a > 12 || b > 12)) {
                op = '+';
            }

            let ans = 0;
            if (op === '+') ans = a + b;
            else if (op === '-') ans = a - b;
            else if (op === '*') ans = a * b;

            let w1 = ans + Math.floor(Math.random() * 10) + 1;
            let w2 = ans - Math.floor(Math.random() * 10) - 1;
            let w3 = ans + 10;

            let optionsSet = new Set([ans, w1, w2, w3]);
            while (optionsSet.size < 4) {
                optionsSet.add(ans + Math.floor(Math.random() * 20) + 1);
            }

            let optionsArray = Array.from(optionsSet).map(String);
            optionsArray.sort(() => Math.random() - 0.5);
            let correctIdx = optionsArray.indexOf(String(ans));

            let skillLabel = skillId.charAt(0).toUpperCase() + skillId.slice(1);

            gameData.quizBank[skillId].push({
                q: `[${skillLabel}] Amaliy savol #${i + 1}\nHirobni bajaring: ${a} ${op} ${b} = ?`,
                options: optionsArray,
                correct: correctIdx,
                hint: `Soha bo'yicha bazaviy bilimni ishga soling.`
            });
        }
    });
}
