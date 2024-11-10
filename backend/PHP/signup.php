<?php
session_start();

// Include necessary files for database connection and functions
require_once "config.php"; // Database connection

// Initialize variables for form fields
$fullname = $email = $phoneNumber = $password = $role = "";
$errors = [];

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
    $fullname = filter_input(INPUT_POST, 'fullname', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phoneNumber = filter_input(INPUT_POST, 'phoneNumber', FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);
    $role = filter_input(INPUT_POST, 'role', FILTER_SANITIZE_STRING);

    // Check for required fields
    if (empty($fullname) || empty($email) || empty($phoneNumber) || empty($password) || empty($role)) {
        $errors[] = "All fields are required.";
    }

    // Password hashing for security
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Handle file upload if a file was selected
    $profilePicturePath = null;
    if (!empty($_FILES['file']['name'])) {
        $targetDirectory = "uploads/";
        $profilePicturePath = $targetDirectory . basename($_FILES["file"]["name"]);
        $fileType = strtolower(pathinfo($profilePicturePath, PATHINFO_EXTENSION));

        // Check file type
        if (in_array($fileType, ["jpg", "png", "jpeg", "gif"])) {
            // Move file to target directory
            if (!move_uploaded_file($_FILES["file"]["tmp_name"], $profilePicturePath)) {
                $errors[] = "Failed to upload profile picture.";
            }
        } else {
            $errors[] = "Only JPG, JPEG, PNG, and GIF files are allowed.";
        }
    }

    // If no errors, insert data into database
    if (empty($errors)) {
        $sql = "INSERT INTO users (fullname, email, phone_number, password, role, profile_picture) VALUES (?, ?, ?, ?, ?, ?)";
        if ($stmt = $db->prepare($sql)) {
            $stmt->bind_param("ssssss", $fullname, $email, $phoneNumber, $hashedPassword, $role, $profilePicturePath);

            if ($stmt->execute()) {
                $_SESSION["success"] = "Registration successful. You can now log in.";
                header("Location: login.php");
                exit;
            } else {
                $errors[] = "An error occurred. Please try again.";
            }
            $stmt->close();
        }
    }
}
?>

<!-- HTML Form -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup</title>
    <link rel="stylesheet" href="styles.css"> <!-- Add your CSS file here -->
</head>
<body>
    <div class="container">
        <h1>Create Your Account</h1>

        <?php
        if (!empty($errors)) {
            echo '<div class="errors">';
            foreach ($errors as $error) {
                echo "<p>$error</p>";
            }
            echo '</div>';
        }
        ?>

        <form action="signup.php" method="POST" enctype="multipart/form-data">
            <label for="fullname">Full Name</label>
            <input type="text" id="fullname" name="fullname" value="<?php echo htmlspecialchars($fullname); ?>" required>

            <label for="email">Email</label>
            <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($email); ?>" required>

            <label for="phoneNumber">Phone Number</label>
            <input type="text" id="phoneNumber" name="phoneNumber" value="<?php echo htmlspecialchars($phoneNumber); ?>" required>

            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>

            <label>Role</label>
            <div>
                <input type="radio" id="student" name="role" value="student" <?php if ($role == "student") echo "checked"; ?>>
                <label for="student">Student</label>

                <input type="radio" id="recruiter" name="role" value="recruiter" <?php if ($role == "recruiter") echo "checked"; ?>>
                <label for="recruiter">Recruiter</label>
            </div>

            <label for="file">Profile Picture</label>
            <input type="file" id="file" name="file" accept="image/*">

            <button type="submit">Signup</button>
        </form>
        
        <p>Already have an account? <a href="login.php">Login</a></p>
    </div>
</body>
</html>
