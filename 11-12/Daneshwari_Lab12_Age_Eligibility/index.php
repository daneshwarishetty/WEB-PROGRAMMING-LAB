<?php
$name = "";
$age = "";
$message = "";
$messageClass = "";
$submitted = false;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $submitted = true;
    $name = trim($_POST["name"] ?? "");
    $age = trim($_POST["age"] ?? "");

    if ($name === "" || $age === "" || !filter_var($age, FILTER_VALIDATE_INT) || (int)$age < 0) {
        $message = "Please enter a valid name and age.";
        $messageClass = "error";
    } else {
        if ((int)$age < 18) {
            $message = "Hello, " . $name . ", you are not authorized to visit the site.";
            $messageClass = "warning";
        } else {
            $message = "Welcome to this site, " . $name . "!";
            $messageClass = "success";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Age Eligibility Check</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="page">
        <section class="panel">
            <div class="eyebrow">AGE VERIFICATION</div>
            <h1>Welcome Check</h1>
            <p class="intro">Enter your details below to check whether you are eligible to visit this site.</p>

            <form method="POST" action="">
                <label for="name">Your name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value="<?php echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8'); ?>"
                    required
                >

                <label for="age">Your age</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Enter your age"
                    min="0"
                    step="1"
                    value="<?php echo htmlspecialchars($age, ENT_QUOTES, 'UTF-8'); ?>"
                    required
                >

                <button type="submit">Check Eligibility</button>
            </form>

            <?php if ($submitted): ?>
                <div class="result <?php echo htmlspecialchars($messageClass, ENT_QUOTES, 'UTF-8'); ?>" role="status">
                    <?php echo htmlspecialchars($message, ENT_QUOTES, 'UTF-8'); ?>
                </div>
            <?php endif; ?>

            <footer>Created by Daneshwari Kuruvinashetty</footer>
        </section>
    </main>
</body>
</html>
