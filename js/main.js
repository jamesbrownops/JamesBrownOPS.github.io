/* --- JAMESBROWNOPS SYSTEMS CORE v1.2 --- */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // SECTOR 1: LOG TERMINAL (Violet System)
    // ==========================================
    const commitBtn = document.getElementById('commitBtn');
    const logInput = document.getElementById('logInput');
    const logDisplay = document.getElementById('logDisplayArea');

    if (commitBtn && logInput && logDisplay) {
        console.log("Log Terminal: ONLINE");
        loadSavedLogs(); 

        commitBtn.addEventListener('click', () => {
            const text = logInput.value.trim();
            if (text === "") { alert("Input required."); return; }

            const newEntry = {
                id: Date.now(),
                date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
                content: text
            };

            saveLog(newEntry);
            renderLog(newEntry);
            logInput.value = "";
        });
    }

    // ==========================================
    // SECTOR 2: SIGNAL PORTAL (Cyan System)
    // ==========================================
    const broadcastBtn = document.getElementById('broadcastBtn');
    
    if (broadcastBtn) {
        console.log("Signal Array: ONLINE");
        // Note: Signal history is handled by Formspree email now, 
        // so we don't need local storage logic here anymore.
    }

    // ==========================================
    // SECTOR 3: ARCHIVES (Emerald System)
    // ==========================================
    const archiveFeed = document.getElementById('archiveFeed');

    if (archiveFeed) {
        console.log("Archives: ONLINE");
        loadArchiveFeed();
    }

});

/* --- INTERNAL MEMORY FUNCTIONS --- */

// 1. Save to Black Box
function saveLog(entry) {
    let logs = JSON.parse(localStorage.getItem('JBOPS_MissionLogs')) || [];
    logs.unshift(entry);
    localStorage.setItem('JBOPS_MissionLogs', JSON.stringify(logs));
}

// 2. Load for Log Room (Violet)
function loadSavedLogs() {
    let logs = JSON.parse(localStorage.getItem('JBOPS_MissionLogs')) || [];
    logs.forEach(entry => renderLog(entry));
}

// 3. Render for Log Room (Violet)
function renderLog(entry) {
    const display = document.getElementById('logDisplayArea');
    if (!display) return;

    const logBox = document.createElement('div');
    logBox.style.borderLeft = "2px solid #b496ff";
    logBox.style.background = "rgba(180, 150, 255, 0.05)";
    logBox.style.padding = "15px";
    logBox.style.marginBottom = "20px";
    logBox.style.textAlign = "left";
    logBox.style.animation = "fadeZoomIn 0.5s ease-out";

    logBox.innerHTML = `
        <div style="font-family: 'Courier New', monospace; color: #b496ff; font-size: 0.9rem; margin-bottom: 5px;">
            // RECORDED: ${entry.date}
        </div>
        <div style="font-family: 'Snell Roundhand', cursive; color: #e0d4ff; font-size: 1.5rem; text-shadow: 0 0 10px rgba(180,150,255,0.5);">
            ${entry.content}
        </div>
    `;
    display.prepend(logBox);
}

// 4. Load for Archives (Emerald)
function loadArchiveFeed() {
    const feed = document.getElementById('archiveFeed');
    let logs = JSON.parse(localStorage.getItem('JBOPS_MissionLogs')) || [];
    
    if (logs.length === 0) {
        feed.innerHTML = "<p style='color: #00ffaa; opacity: 0.5; text-align: center;'>// NO RECENT LOG DATA FOUND</p>";
        return;
    }

    logs.forEach(entry => {
        const entryBox = document.createElement('div');
        
        // Match the "log-entry" class style from your CSS
        entryBox.className = "log-entry"; 
        entryBox.style.marginTop = "40px";
        entryBox.style.borderTop = "1px solid rgba(0, 255, 170, 0.3)";
        entryBox.style.paddingTop = "20px";

        entryBox.innerHTML = `
            <span class="date">Stardate: ${entry.date}</span>
            <h2>Command Note</h2>
            <p>${entry.content}</p>
        `;
        feed.appendChild(entryBox);
    });
}