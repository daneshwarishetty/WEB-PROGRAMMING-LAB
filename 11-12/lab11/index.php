<?php
// Set the timezone to Indian Standard Time.
date_default_timezone_set('Asia/Kolkata');

// Get the current date, time, and day from the server.
$currentDate = date('d F Y');
$currentTime = date('h:i:s A');
$currentDay = date('l');
$timeZone = date('T');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A PHP page showing the current date, time and day.">
    <title>Today's Snapshot | Daneshwari</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="page">
        <header class="header">
            <a class="logo" href="index.php">DAY<span>LIGHT</span></a>
            <span class="live-tag"><span class="dot"></span> PHP SERVER TIME</span>
        </header>

        <section class="main-content">
            <div class="intro">
                <p class="kicker">Your daily snapshot</p>
                <h1>Every moment<br>has its <span>time.</span></h1>
                <p class="subtext">
                    A simple date and time display generated dynamically with PHP.
                    Refresh the page to get the latest server reading.
                </p>
            </div>

            <section class="clock-card" aria-label="Current date and time details">
                <div class="card-heading">
                    <span>RIGHT NOW</span>
                    <span class="timezone"><?php echo htmlspecialchars($timeZone, ENT_QUOTES, 'UTF-8'); ?></span>
                </div>

                <div class="detail">
                    <span class="detail-label">TODAY'S DATE</span>
                    <strong><?php echo htmlspecialchars($currentDate, ENT_QUOTES, 'UTF-8'); ?></strong>
                </div>

                <div class="detail time-detail">
                    <span class="detail-label">CURRENT TIME</span>
                    <strong><?php echo htmlspecialchars($currentTime, ENT_QUOTES, 'UTF-8'); ?></strong>
                </div>

                <div class="detail">
                    <span class="detail-label">DAY OF THE WEEK</span>
                    <strong><?php echo htmlspecialchars($currentDay, ENT_QUOTES, 'UTF-8'); ?></strong>
                </div>

                <p class="card-note">Time zone: Asia/Kolkata (India)</p>
            </section>
        </section>

        <footer class="footer">
            <span>Generated dynamically using PHP</span>
            <span>Created by Daneshwari Kuruvinashetty</span>
        </footer>
    </main>
</body>
</html>
