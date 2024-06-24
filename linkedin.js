document.getElementById('startAutomation').addEventListener('click', function() {
    const profileUrls = document.getElementById('profileUrls').value.split(',');
    const customMessage = document.getElementById('customMessage').value;
    const scheduleTime = document.getElementById('scheduleTime').value;
    const statusDiv = document.getElementById('status');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress');
    
    statusDiv.style.display = 'block';
    progressContainer.style.display = 'block';
    
    if (profileUrls.length === 0 || !profileUrls[0].trim()) {
        statusDiv.textContent = 'Please enter at least one LinkedIn profile URL.';
        return;
    }
    
    if (scheduleTime) {
        const now = new Date();
        const scheduleDate = new Date(scheduleTime);
        const delay = scheduleDate - now;
        
        if (delay > 0) {
            statusDiv.textContent = `Automation scheduled for ${scheduleDate}.`;
            setTimeout(() => {
                startAutomation(profileUrls, customMessage);
            }, delay);
            return;
        } else {
            statusDiv.textContent = 'Scheduled time is in the past. Please select a future time.';
            return;
        }
    }
    
    startAutomation(profileUrls, customMessage);
});

function startAutomation(profileUrls, customMessage) {
    const statusDiv = document.getElementById('status');
    const progressBar = document.getElementById('progress-bar');
    
    statusDiv.textContent = 'Automation started...';
    
    profileUrls = profileUrls.map(url => url.trim()).filter(url => isValidUrl(url));
    
    if (profileUrls.length === 0) {
        statusDiv.textContent = 'No valid URLs provided.';
        return;
    }

    let completed = 0;
    profileUrls.forEach((url, index) => {
        setTimeout(() => {
            sendConnectionRequest(url, customMessage);
            completed++;
            const progressPercentage = (completed / profileUrls.length) * 100;
            progressBar.style.width = `${progressPercentage}%`;

            if (completed === profileUrls.length) {
                statusDiv.textContent = 'Automation completed!';
            }
        }, index * 2000);  // Adding delay to simulate the request sending time
    });
}

function sendConnectionRequest(url, customMessage) {
    // Simulate sending a connection request (this would be an API call in a real-world scenario)
    console.log(`Sending connection request to ${url} with message: "${customMessage}"`);
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}
