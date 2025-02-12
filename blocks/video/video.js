function displayGoogleDriveVideo(driveUrl) {
    const embedUrl = driveUrl;
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', embedUrl);
    iframe.setAttribute('class', 'video-iframe'); 
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'autoplay; encrypted-media');
    iframe.setAttribute('allowfullscreen', true);

    const videoContainer = document.querySelector('.video');
    videoContainer.innerHTML = '';  
    videoContainer.appendChild(iframe); 
}

const googleDriveVideoUrl = 'https://drive.google.com/file/d/1HLxrLuB3oYJHaZS04ojYj3H5-dO5LcTM/preview';
displayGoogleDriveVideo(googleDriveVideoUrl);
