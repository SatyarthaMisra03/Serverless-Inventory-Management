function saveToStorage() {
    // 1. Perform the actual save
    localStorage.setItem('vaultInventoryData', JSON.stringify(inventory));

    // 2. Trigger the "Visual Proof" on the webpage
    const indicator = document.getElementById('js-status-indicator');
    
    // Add the pulse class
    indicator.classList.add('pulse-active');
    
    // Log to console for extra reference
    console.log("💾 Data synced to LocalStorage.");

    // Remove the pulse after 800ms so it's ready for the next save
    setTimeout(() => {
        indicator.classList.remove('pulse-active');
    }, 800);
}