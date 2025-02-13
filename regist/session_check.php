/<?php

//session management problem
session_start();
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: ../regist/sign_log.html');
    exit;
}
?>
