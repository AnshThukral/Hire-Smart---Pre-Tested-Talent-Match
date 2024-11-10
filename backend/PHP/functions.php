<?php
// Database connection (replace with your actual database credentials)
$host = 'localhost';
$dbname = 'your_database';
$username = 'your_username';
$password = 'your_password';

$db = new mysqli($host, $username, $password, $dbname);

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

// Hash Password
function hashPassword($password) {
    return password_hash($password, PASSWORD_BCRYPT);
}

// Verify Password
function verifyPassword($inputPassword, $hashedPassword) {
    return password_verify($inputPassword, $hashedPassword);
}

// Sanitize Input
function sanitizeInput($input) {
    return htmlspecialchars(strip_tags(trim($input)));
}

// Validate Email
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Generate Random Token
function generateToken($length = 50) {
    return bin2hex(random_bytes($length / 2));
}

// Save User to Database
function saveUser($fullname, $email, $phoneNumber, $password, $role, $profilePicturePath) {
    global $db;
    $hashedPassword = hashPassword($password);

    $sql = "INSERT INTO users (fullname, email, phone_number, password, role, profile_picture) VALUES (?, ?, ?, ?, ?, ?)";
    if ($stmt = $db->prepare($sql)) {
        $stmt->bind_param("ssssss", $fullname, $email, $phoneNumber, $hashedPassword, $role, $profilePicturePath);
        return $stmt->execute();
    }
    return false;
}

// Handling Form Submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = sanitizeInput($_POST['fullname']);
    $email = sanitizeInput($_POST['email']);
    $phoneNumber = sanitizeInput($_POST['phoneNumber']);
    $password = sanitizeInput($_POST['password']);
    $role = sanitizeInput($_POST['role']);

    // File upload handling
    $profilePicturePath = '';
    if (isset($_FILES['profile_picture']) && $_FILES['profile_picture']['error'] == 0) {
        $targetDir = "uploads/";
        $profilePicturePath = $targetDir . basename($_FILES["profile_picture"]["name"]);
        move_uploaded_file($_FILES["profile_picture"]["tmp_name"], $profilePicturePath);
    }

    // Validate email and save user
    if (validateEmail($email) && saveUser($fullname, $email, $phoneNumber, $password, $role, $profilePicturePath)) {
        echo "User successfully registered!";
    } else {
        echo "Registration failed. Please check your input.";
    }
}
?>