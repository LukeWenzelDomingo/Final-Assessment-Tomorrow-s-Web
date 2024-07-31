<?php
include 'database.php';
$name = $_POST['fname'];
$name2 = $_POST['lname'];
$email = $_POST['email'];
$password = $_POST['password'];
$sql= "INSERT INTO user(name,name2,email,password) VALUES('$name','$name2','$email','$password')";
if($conn->query($sql)==TRUE){
echo "Data Inserted";
}
else{
echo "Connection Failed".$sql."<br>".$conn->error;
}

?>