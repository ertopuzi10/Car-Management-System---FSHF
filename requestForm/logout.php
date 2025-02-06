<?php
session_start();
session_unset();  // Clear session data
session_destroy(); // Destroy the session

header('Location: sign_log.html'); // Redirect to sign_log.html
exit();
?>
