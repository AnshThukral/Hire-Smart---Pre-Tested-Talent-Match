<?php
session_start();
require 'config.php'; // Database connection

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $role = $_POST['role'];

    // Input validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['error'] = "Invalid email format";
        header("Location: login.php");
        exit;
    }

    try {
        // Fetch user from database
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email AND role = :role");
        $stmt->execute(['email' => $email, 'role' => $role]);
        $user = $stmt->fetch();

        // Verify user and password
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user'] = $user; // Save user info in session
            $_SESSION['success'] = "Login successful!";
            header("Location: index.php"); // Redirect to home page
            exit;
        } else {
            $_SESSION['error'] = "Invalid credentials";
            header("Location: login.php");
            exit;
        }
    } catch (PDOException $e) {
        $_SESSION['error'] = "An unexpected error occurred. Please try again.";
        header("Location: login.php");
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="style.css"> <!-- Add your CSS file -->
</head>
<body>
    <div class="login-container">
        <h1>Access Your Account</h1>

        <!-- Display session messages -->
        <?php if (isset($_SESSION['error'])): ?>
            <div class="error-message"><?php echo $_SESSION['error']; unset($_SESSION['error']); ?></div>
        <?php elseif (isset($_SESSION['success'])): ?>
            <div class="success-message"><?php echo $_SESSION['success']; unset($_SESSION['success']); ?></div>
        <?php endif; ?>

        <!-- Login Form -->
        <form method="POST" action="login.php">
            <!-- Email -->
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="anshthukral2504@gmail.com" required>

            <!-- Password -->
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>

            <!-- Role -->
            <div class="role-group">
                <label>Role</label>
                <input type="radio" id="student" name="role" value="student" required>
                <label for="student">Student</label>
                <input type="radio" id="recruiter" name="role" value="recruiter" required>
                <label for="recruiter">Recruiter</label>
            </div>

            <!-- Login Button -->
            <button type="submit">Login</button>
        </form>

        <!-- Signup Link -->
        <p>Don't have an account? <a href="signup.php">Signup</a></p>
    </div>
</body>
</html>
