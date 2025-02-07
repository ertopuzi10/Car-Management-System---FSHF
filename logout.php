<?php
session_start();
session_destroy();
header("Location: ../regist/sign_log.php"); // Redirect to login page
exit();
?>

