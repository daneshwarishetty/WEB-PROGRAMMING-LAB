// Lab 5 JavaScript
// Pause the scrolling announcement when the mouse is over it.
const announcement = document.getElementById("announcementText");

if (announcement) {
    announcement.addEventListener("mouseenter", function () {
        announcement.stop();
    });

    announcement.addEventListener("mouseleave", function () {
        announcement.start();
    });
}
