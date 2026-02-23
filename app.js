// ============================================================
//  PATHFINDER — Main Game Engine
// ============================================================

// ── STATE ─────────────────────────────────────────────────
const state = {
    player: {
        name: "",
        avatarIcon: "fa-user-astronaut",
        careerId: null,
        levelIndex: 0,   // 0=Junior 1=Middle 2=Senior
        exp: 0,
        skills: {}       // { skillId: points }
    },
    resources: {
        money: 0,
        energy: 100,
        time: 1,         // week number
        stress: 0
    },
    levelMultipliers: [1, 1.6, 2.8],
    expThresholds: [100, 300, 99999]
};

// ── DOM CACHE ──────────────────────────────────────────────
const $ = id => document.getElementById(id);
const els = {
    screenChar: $('screen-character-creation'),
    screenCareer: $('screen-career-selection'),
    screenDash: $('screen-dashboard'),
    inputName: $('char-name'),
    btnStart: $('btn-start-game'),
    avatarOptions: document.querySelectorAll('.avatar-option'),
    careersContainer: $('careers-container'),
    dashName: $('dash-name'),
    dashAvatar: $('dash-avatar-icon'),
    dashCareerTitle: $('dash-career-title'),
    resMoney: $('res-money'),
    resTime: $('res-time'),
    resEnergyBar: $('res-energy-bar'),
    resEnergyTxt: $('res-energy-txt'),
    resStressBar: $('res-stress-bar'),
    resStressTxt: $('res-stress-txt'),
    expBar: $('exp-bar'),
    expText: $('exp-text'),
    promoHint: $('promotion-hint'),
    activityLog: $('activity-log'),
    skillsPanel: $('skills-panel')
};

let selectedAvatarClass = "fa-user-astronaut";

// ── INIT ───────────────────────────────────────────────────
function init() {
    // Character name validation
    els.inputName.addEventListener('input', e => {
        els.btnStart.disabled = e.target.value.trim().length < 2;
    });

    // Avatar selection
    els.avatarOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            els.avatarOptions.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            selectedAvatarClass = opt.querySelector('i').className.replace(' fa-3x', '');
        });
    });

    // Start → Career screen
    els.btnStart.addEventListener('click', () => {
        state.player.name = els.inputName.value.trim();
        state.player.avatarIcon = selectedAvatarClass;
        switchScreen(els.screenChar, els.screenCareer);
        renderCareers();
    });

    // Action buttons
    $('action-work').addEventListener('click', doWork);
    $('action-study').addEventListener('click', doStudy);
    $('action-rest').addEventListener('click', doRest);
    $('action-shop').addEventListener('click', openShop);

    // Modal close buttons
    $('btn-close-task').addEventListener('click', closeModals);
    $('btn-close-shop').addEventListener('click', closeModals);
    $('btn-close-event').addEventListener('click', closeModals);
}

// ── SCREEN UTILS ──────────────────────────────────────────
function switchScreen(from, to) {
    from.classList.remove('active');
    from.classList.add('hidden');
    to.classList.remove('hidden');
    to.classList.add('active');
}

// ── CAREER SELECTION ─────────────────────────────────────
function renderCareers() {
    els.careersContainer.innerHTML = '';
    gameData.careers.forEach(career => {
        const card = document.createElement('div');
        card.className = 'career-card fade-in-up';
        card.style.setProperty('--career-color', career.color);
        const skillList = career.skills.map(s =>
            `<span class="skill-tag"><i class="${s.icon}"></i> ${s.label}</span>`
        ).join('');
        card.innerHTML = `
            <i class="${career.icon}" style="color:${career.color}"></i>
            <h3>${career.title}</h3>
            <p>${career.description}</p>
            <div class="career-skills-preview mt-sm">${skillList}</div>
            <button class="btn btn-primary mt-sm" style="width:100%;background:${career.color};box-shadow:0 4px 14px ${career.color}55">Tanlash</button>
        `;
        card.addEventListener('click', () => selectCareer(career.id));
        els.careersContainer.appendChild(card);
    });
}

function selectCareer(careerId) {
    state.player.careerId = careerId;
    const career = getCareer();

    // Starting money = base junior rate × 5
    state.resources.money = career.baseRates.junior * 5;

    // Init skills only if they don't exist (to keep skills when changing career after 1 year)
    career.skills.forEach(s => {
        if (state.player.skills[s.id] === undefined) state.player.skills[s.id] = 0;
    });

    switchScreen(els.screenCareer, els.screenDash);
    renderSkillsPanel();
    updateDashboard();
    logActivity(`${career.title} bo'lib faoliyatni boshladingiz! Omad!`, 'success');
}

// ── HELPERS ───────────────────────────────────────────────
function getCareer() {
    return gameData.careers.find(c => c.id === state.player.careerId);
}

// ── SKILLS PANEL ─────────────────────────────────────────
function renderSkillsPanel() {
    const career = getCareer();
    if (!els.skillsPanel) return;

    els.skillsPanel.innerHTML = `<h4 style="margin-bottom:1rem;border-bottom:1px solid var(--glass-border);padding-bottom:0.5rem;">
        <i class="fa-solid fa-star" style="color:var(--primary);margin-right:0.4rem;"></i>Skilllar
    </h4>`;

    career.skills.forEach(skill => {
        const pts = state.player.skills[skill.id] || 0;
        const max = career.skillThresholds[1]; // senior threshold as max
        const pct = Math.min(100, (pts / max) * 100);
        const color = pct >= 80 ? 'var(--success)' : pct >= 40 ? 'var(--warning)' : 'var(--primary)';

        const div = document.createElement('div');
        div.className = 'skill-item';
        div.id = `skill-row-${skill.id}`;
        div.innerHTML = `
            <div class="skill-header">
                <span><i class="${skill.icon}" style="color:${color};margin-right:0.4rem;"></i>${skill.label}</span>
                <span class="skill-pts">${pts} pt</span>
            </div>
            <div class="progress-bar-container" style="margin-top:0.3rem;">
                <div class="progress-bar" id="skill-bar-${skill.id}" style="width:${pct}%;background:${color};box-shadow:0 0 8px ${color};"></div>
            </div>
            <p style="font-size:0.72rem;color:var(--text-gray);margin-top:0.2rem;">${skill.desc}</p>
        `;
        els.skillsPanel.appendChild(div);
    });
}

function updateSkillsPanel() {
    const career = getCareer();
    const max = career.skillThresholds[1];
    career.skills.forEach(skill => {
        const pts = state.player.skills[skill.id] || 0;
        const pct = Math.min(100, (pts / max) * 100);
        const color = pct >= 80 ? 'var(--success)' : pct >= 40 ? 'var(--warning)' : 'var(--primary)';
        const bar = $(`skill-bar-${skill.id}`);
        const row = $(`skill-row-${skill.id}`);
        if (bar) { bar.style.width = `${pct}%`; bar.style.background = color; bar.style.boxShadow = `0 0 8px ${color}`; }
        if (row) { row.querySelector('.skill-pts').textContent = `${pts} pt`; }
    });
}

// ── DASHBOARD UPDATE ─────────────────────────────────────
function updateDashboard() {
    const career = getCareer();
    const levelName = career.levels[state.player.levelIndex];

    // Profile
    els.dashName.textContent = state.player.name;
    els.dashAvatar.className = state.player.avatarIcon + ' fa-3x';
    els.dashCareerTitle.textContent = levelName;

    // Money — show positive in green
    const money = Math.floor(state.resources.money);
    els.resMoney.textContent = `${money}$`;
    els.resMoney.style.color = money >= 0 ? 'var(--success)' : 'var(--danger)';

    els.resTime.textContent = state.resources.time;

    const energy = Math.max(0, Math.min(100, state.resources.energy));
    els.resEnergyBar.style.width = `${energy}%`;
    els.resEnergyTxt.textContent = `${Math.floor(energy)}/100`;

    const stress = Math.max(0, Math.min(100, state.resources.stress));
    els.resStressBar.style.width = `${stress}%`;
    els.resStressTxt.textContent = `${Math.floor(stress)}/100`;

    // EXP bar
    const prevThresh = state.player.levelIndex > 0 ? state.expThresholds[state.player.levelIndex - 1] : 0;
    const curThresh = state.expThresholds[state.player.levelIndex];
    const range = curThresh - prevThresh;
    const inRange = state.player.exp - prevThresh;
    let pct = state.player.levelIndex >= 2 ? 100 : Math.min(100, (inRange / range) * 100);

    els.expBar.style.width = `${pct}%`;
    els.expText.textContent = state.player.levelIndex >= 2 ? 'MAX' : `${Math.floor(state.player.exp)}/${curThresh}`;

    // Promotion hint — show current skills requirement
    if (state.player.levelIndex < 2) {
        const reqSkill = career.skillThresholds[state.player.levelIndex];
        const skillStatus = career.skills.map(s => {
            const cur = state.player.skills[s.id] || 0;
            return cur >= reqSkill ? `✓ ${s.label}` : `${cur}/${reqSkill} ${s.label}`;
        }).join(' · ');
        els.promoHint.textContent = `Keyingi daraja: ${curThresh} EXP + [${skillStatus}]`;
    } else {
        els.promoHint.textContent = `🏆 Siz soha mutaxassisiga aylandingiz!`;
    }

    updateSkillsPanel();
}

// ── LOG ───────────────────────────────────────────────────
function logActivity(message, type = 'info') {
    const li = document.createElement('li');
    const colorMap = { success: 'text-success', danger: 'text-danger', warning: 'text-warning', info: '' };
    const cls = colorMap[type] || '';
    li.innerHTML = `<span><span class="text-gray">[Hafta ${state.resources.time}]</span> <span class="${cls}">${message}</span></span>`;
    els.activityLog.prepend(li);
}

// ── ACTIONS ───────────────────────────────────────────────

function doWork() {
    if (state.resources.energy < 15) {
        logActivity('Ishlash uchun energiya yetarli emas. Dam oling!', 'danger');
        return;
    }

    const career = getCareer();
    const baseRate = Object.values(career.baseRates)[state.player.levelIndex];

    // Work experience logic (Har bir ishlaganda ish haqi 1% ga oshib boradi)
    state.player.workCount = (state.player.workCount || 0) + 1;
    const expMultiplier = 1 + (state.player.workCount * 0.01);

    // Total skill level factor (Skill oshganda yana daromad oshadi)
    const avgSkill = Object.values(state.player.skills).reduce((a, b) => a + b, 0) / career.skills.length;
    const skillFactor = 1 + (avgSkill / 100);

    const discipline = 0.85 + Math.random() * 0.3;
    const energyFactor = state.resources.energy / 100;
    const levelMulti = state.levelMultipliers[state.player.levelIndex];

    // Earned income completely scales with: base, skill, work experience, player level
    const earned = baseRate * skillFactor * discipline * energyFactor * levelMulti * expMultiplier;

    // ✅ Money INCREASES by earned amount
    state.resources.money += earned;
    state.resources.energy -= 15 + Math.random() * 10;
    state.resources.stress += 5 + Math.random() * 5;

    clamp();
    logActivity(`Ishladingiz! Baza: ${baseRate}$, Skill+Tajriba bonus: +${(earned - baseRate).toFixed(1)}$. Jami: +${earned.toFixed(1)}$ 💰`, 'success');
    advanceTime();
}

function doStudy() {
    if (state.resources.energy < 20) {
        logActivity("O'qish uchun energiya yetarli emas!", 'danger');
        return;
    }

    const career = getCareer();
    // Pick ONE of the 4 skills at random
    const skill = career.skills[Math.floor(Math.random() * career.skills.length)];
    const questions = gameData.quizBank[skill.id];

    openQuizModal(skill, questions);
}

function openQuizModal(skill, questions) {
    const taskModal = $('modal-task');
    const taskTitle = $('task-title');
    const taskBody = $('task-body');

    taskTitle.innerHTML = `<i class="${skill.icon}" style="margin-right:0.4rem;"></i>${skill.label} fanidan savol`;

    if (!questions || questions.length === 0) {
        completeStudy(skill.id, true);
        return;
    }

    const q = questions[Math.floor(Math.random() * questions.length)];

    taskBody.innerHTML = `
        <div class="quiz-question-box">
            <p class="quiz-q"><strong>❓ Savol:</strong> ${q.q}</p>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <button class="btn quiz-opt" data-idx="${i}">
                        <span class="opt-letter">${'ABCD'[i]}</span>${opt}
                    </button>`).join('')}
            </div>
            <p class="quiz-hint" style="display:none;font-size:0.8rem;color:var(--text-gray);margin-top:0.8rem;">
                💡 Maslahat: ${q.hint}
            </p>
        </div>
    `;

    let hintShown = false;
    const btns = taskBody.querySelectorAll('.quiz-opt');
    const hintEl = taskBody.querySelector('.quiz-hint');

    // "Hint" button
    const hintBtn = document.createElement('button');
    hintBtn.className = 'btn';
    hintBtn.style.cssText = 'background:rgba(255,255,255,0.08);color:var(--text-gray);margin-top:0.5rem;font-size:0.85rem;';
    hintBtn.innerHTML = `<i class="fa-solid fa-circle-info"></i> Maslahat ko'rish`;
    hintBtn.addEventListener('click', () => {
        hintEl.style.display = 'block';
        hintBtn.style.display = 'none';
        hintShown = true;
    });
    taskBody.querySelector('.quiz-question-box').appendChild(hintBtn);

    btns.forEach(btn => {
        btn.addEventListener('click', e => {
            const chosen = parseInt(e.currentTarget.getAttribute('data-idx'));
            const correct = chosen === q.correct;

            state.resources.energy -= 20;
            state.resources.stress += correct ? 3 : 10;

            btns.forEach(b => { b.disabled = true; b.style.opacity = '0.6'; });
            btns[q.correct].style.background = 'var(--success)';
            btns[q.correct].style.opacity = '1';
            btns[q.correct].style.boxShadow = '0 0 12px var(--success)';

            if (!correct) {
                e.currentTarget.style.background = 'var(--danger)';
                e.currentTarget.style.opacity = '1';
            }

            setTimeout(() => {
                closeModals();
                completeStudy(skill.id, correct, hintShown);
            }, correct ? 1000 : 1800);
        });
    });

    taskModal.classList.remove('hidden');
}

function completeStudy(skillId, correct, usedHint = false) {
    clamp();
    if (correct) {
        const expGain = usedHint ? 8 + Math.random() * 5 : 15 + Math.random() * 10;
        const skillGain = usedHint ? 8 : 15;
        state.player.exp += expGain;
        state.player.skills[skillId] = (state.player.skills[skillId] || 0) + skillGain;

        const skillLabel = getCareer().skills.find(s => s.id === skillId)?.label || skillId;
        logActivity(`To'g'ri javob! ✅ +${Math.floor(expGain)} EXP, +${skillGain} ${skillLabel}`, 'success');
    } else {
        logActivity("Noto'g'ri javob ❌ — Vaqt va energiya ketdi. Lekin keyingi safar bilasiz!", 'danger');
    }
    checkPromotion();
    advanceTime();
}

function doRest() {
    const energyGain = 35 + Math.random() * 25;
    const stressLoss = 25 + Math.random() * 20;
    state.resources.energy += energyGain;
    state.resources.stress -= stressLoss;
    clamp();
    // ✅ Rest does NOT advance time and does NOT deduct money
    logActivity(`Dam oldingiz 😌 Energiya +${Math.floor(energyGain)}, Stress pasaydi.`, 'success');
    updateDashboard();
}

function openShop() {
    const shopModal = $('modal-shop');
    const catalog = $('shop-catalog');

    const items = [
        { name: "Ovqat", icon: "fa-solid fa-bowl-food", price: 15, effect: { energy: +25, stress: -5 }, desc: "+25 Energiya" },
        { name: "Vitamins", icon: "fa-solid fa-pills", price: 20, effect: { energy: +15, stress: -15 }, desc: "+15 Energiya, -15 Stress" },
        { name: "Noutbuk", icon: "fa-solid fa-laptop", price: 150, effect: { energy: 0, stress: -10, skillBonus: 20 }, desc: "+20 pt barcha skilllarga" },
        { name: "Onlayn kurs", icon: "fa-solid fa-graduation-cap", price: 80, effect: { energy: -10, stress: +5, skillBonus: 35 }, desc: "+35 pt barcha skilllarga" },
        { name: "Yoga darsi", icon: "fa-solid fa-spa", price: 30, effect: { energy: +20, stress: -30 }, desc: "+20 Energiya, -30 Stress" },
        { name: "Kitob", icon: "fa-solid fa-book", price: 25, effect: { energy: -5, stress: 0, skillBonus: 15 }, desc: "+15 pt barcha skillarga" },
    ];

    catalog.innerHTML = items.map((item, idx) => `
        <div class="shop-item glass-panel" id="shop-item-${idx}">
            <div class="shop-icon"><i class="${item.icon}"></i></div>
            <div class="shop-info">
                <strong>${item.name}</strong>
                <p>${item.desc}</p>
            </div>
            <button class="btn btn-buy" data-shop-idx="${idx}" style="background:var(--primary);color:#fff;min-width:80px;">
                💰 ${item.price}$
            </button>
        </div>
    `).join('');

    catalog.querySelectorAll('.btn-buy').forEach(btn => {
        btn.addEventListener('click', e => {
            const idx = parseInt(e.currentTarget.getAttribute('data-shop-idx'));
            buyItem(items[idx], idx);
        });
    });

    shopModal.classList.remove('hidden');
}

function buyItem(item, idx) {
    if (state.resources.money < item.price) {
        logActivity(`Pul yetmaydi! ${item.name} narxi: ${item.price}$`, 'danger');
        return;
    }
    state.resources.money -= item.price;
    if (item.effect.energy) state.resources.energy += item.effect.energy;
    if (item.effect.stress) state.resources.stress += item.effect.stress;
    if (item.effect.skillBonus) {
        const career = getCareer();
        career.skills.forEach(s => {
            state.player.skills[s.id] = (state.player.skills[s.id] || 0) + item.effect.skillBonus;
        });
    }
    clamp();
    logActivity(`Xarid: "${item.name}" — ${item.desc}. -${item.price}$`, 'warning');
    updateDashboard();

    const btn = document.querySelector(`[data-shop-idx="${idx}"]`);
    if (btn) { btn.textContent = '✅ Olindi'; btn.disabled = true; }
}

// ── CLAMP RESOURCES ──────────────────────────────────────
function clamp() {
    state.resources.energy = Math.max(0, Math.min(100, state.resources.energy));
    state.resources.stress = Math.max(0, Math.min(100, state.resources.stress));

    if (state.resources.stress >= 100) {
        state.resources.stress = 10;
        state.resources.energy = 40;
        state.resources.money = Math.max(0, state.resources.money - 60);
        logActivity('🚨 Stress limitga yetdi! Kasalxonaga tushdingiz. -60$ va energiya tiklandi.', 'danger');
    }
}

// ── PROMOTION CHECK ──────────────────────────────────────
function checkPromotion() {
    if (state.player.levelIndex >= 2) return;

    const career = getCareer();
    const reqExp = state.expThresholds[state.player.levelIndex];
    const reqSkill = career.skillThresholds[state.player.levelIndex];

    const expOk = state.player.exp >= reqExp;
    const skillsOk = career.skills.every(s => (state.player.skills[s.id] || 0) >= reqSkill);

    if (expOk && skillsOk) {
        state.player.levelIndex++;
        const newTitle = career.levels[state.player.levelIndex];
        logActivity(`🎉 TABRIKLAYMIZ! "${newTitle}" darajasiga ko'tarildingiz! Oyligingiz oshdi!`, 'success');
        // Bonus on promotion
        const bonus = Object.values(career.baseRates)[state.player.levelIndex] * 3;
        state.resources.money += bonus;
        logActivity(`Darajaga o'tish mukofoti: +${bonus}$ 🎁`, 'success');
    }
}

// ── RANDOM EVENTS ────────────────────────────────────────
function maybeFireEvent() {
    // ~35% chance each productive action
    if (Math.random() > 0.35) return;

    const career = getCareer();
    const eligible = gameData.careerEvents.filter(ev =>
        ev.careers === 'all' || ev.careers.includes(career.id)
    );
    if (!eligible.length) return;

    const ev = eligible[Math.floor(Math.random() * eligible.length)];

    // Apply effects
    if (ev.effect.energy) state.resources.energy += ev.effect.energy;
    if (ev.effect.stress) state.resources.stress += ev.effect.stress;
    if (ev.effect.money) state.resources.money += ev.effect.money;

    clamp();

    // Show event in modal
    showEventModal(ev);
}

function showEventModal(ev) {
    const modal = $('modal-event');
    const body = $('event-body');
    if (!modal) return;

    const typeColor = ev.type === 'good' ? 'var(--success)' : ev.type === 'bad' ? 'var(--danger)' : 'var(--warning)';

    const fmt = (val, prefix = '') => {
        if (!val) return '';
        const sign = val > 0 ? `+${val}` : val;
        return `<span style="color:${val > 0 ? 'var(--success)' : 'var(--danger)'}">${sign} ${prefix}</span>`;
    };

    body.innerHTML = `
        <div class="text-center">
            <div style="font-size:3rem;margin-bottom:0.8rem">${ev.emoji}</div>
            <h3 style="color:${typeColor};margin-bottom:0.5rem">${ev.title}</h3>
            <p style="color:var(--text-gray);margin-bottom:1rem">${ev.desc}</p>
            <div style="display:flex;justify-content:center;gap:1rem;flex-wrap:wrap;">
                ${ev.effect.energy ? `<div class="event-badge">${fmt(ev.effect.energy)} Energiya</div>` : ''}
                ${ev.effect.stress ? `<div class="event-badge">${fmt(-ev.effect.stress)} Stress</div>` : ''}
                ${ev.effect.money ? `<div class="event-badge">${fmt(ev.effect.money)} Pul</div>` : ''}
            </div>
            <button class="btn btn-primary mt-lg" onclick="closeModals(); updateDashboard();" style="margin-top:1rem">
                Davom etish <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    `;

    modal.classList.remove('hidden');
}

// ── TIME ─────────────────────────────────────────────────
function advanceTime() {
    state.resources.time++;

    // Weekly living expense (small, not punishing)
    const expense = 8 + state.player.levelIndex * 10;
    state.resources.money -= expense;

    if (state.resources.money < 0) {
        logActivity(`Haftaning yashash xarajati: -${expense}$ (Pul yetmadi! +stress)`, 'danger');
        state.resources.stress += 12;
    } else {
        logActivity(`Haftalik xarajat: -${expense}$`, 'warning');
    }

    clamp();
    maybeFireEvent(); // Try to trigger a career event
    updateDashboard();

    // End game exactly at multiples of 52 weeks (1 year, 2 years, etc)
    if (state.resources.time > 1 && (state.resources.time - 1) % 52 === 0) {
        endGame();
    }
}

// ── MODALS ───────────────────────────────────────────────
function closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
}

// ── END GAME ─────────────────────────────────────────────
function endGame() {
    const career = getCareer();
    const level = career.levels[state.player.levelIndex];
    const money = Math.floor(state.resources.money);

    // Build skill report
    const skillReport = career.skills.map(s => {
        const pts = state.player.skills[s.id] || 0;
        const max = career.skillThresholds[1];
        const pct = Math.round((pts / max) * 100);
        const bar = `<div style="height:8px;background:rgba(255,255,255,0.1);border-radius:99px;overflow:hidden;margin-top:3px"><div style="height:100%;width:${Math.min(100, pct)}%;background:${pct >= 60 ? 'var(--success)' : 'var(--primary)'};border-radius:99px;"></div></div>`;
        return `<div style="margin-bottom:0.6rem"><span>${s.label}: ${pts} pt (${pct}%)</span>${bar}</div>`;
    }).join('');

    const msg = money > 500 ? `💰 Ajoyib moliyaviy menejmеnt! Siz yaxshi tejadingiz.`
        : money > 0 ? `📊 Balansingiz musbat — lekin tejash odatini oshiring.`
            : `📉 Moliyaviy boshqaruvga e'tibor bering.`;

    const levelMsg = state.player.levelIndex === 2 ? `🏆 Eng yuqori darajaga yetdingiz: <strong>${level}</strong>`
        : state.player.levelIndex === 1 ? `⬆️ Middle darajasiga ko'tarildingiz: <strong>${level}</strong>`
            : `📌 Junior darajasida qoldingiz. Ko'proq o'qing va ishlaping.`;

    $('eval-body').innerHTML = `
        <div>
            <div class="text-center" style="margin-bottom:1.5rem">
                <div style="font-size:3rem;margin-bottom:0.5rem">🎓</div>
                <h3>1 Yil tugadi!</h3>
                <p style="color:var(--text-gray)">${state.player.name} — ${career.title}</p>
            </div>
            <div class="eval-grid">
                <div class="eval-box"><strong>Daraja</strong><p style="color:var(--primary)">${levelMsg}</p></div>
                <div class="eval-box"><strong>Jamg'arma</strong><p style="color:${money > 0 ? 'var(--success)' : 'var(--danger)'}">${money}$</p></div>
                <div class="eval-box" style="grid-column:span 2"><strong>Skilllar rivojlanishi</strong>${skillReport}</div>
                <div class="eval-box" style="grid-column:span 2"><strong>Moliyaviy tahlil</strong><p>${msg}</p></div>
            </div>
        </div>
    `;

    $('modal-evaluation').classList.remove('hidden');
}

// ── END GAME OPTIONS ─────────────────────────────────────
function continueGame() {
    $('modal-evaluation').classList.add('hidden');
    logActivity(`Ajoyib! Yangi ish yilini boshladingiz. Maqsadlarga sari davom eting!`, 'success');
}

function changeCareer() {
    $('modal-evaluation').classList.add('hidden');
    // Clear old skill panels from DOM
    els.skillsPanel.innerHTML = '';
    // Show career screen
    switchScreen(els.screenDash, els.screenCareer);
}

// ── BOOT ─────────────────────────────────────────────────
window.onload = init;
