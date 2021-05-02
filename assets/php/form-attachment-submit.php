<?php

include 'simple-api-lib.php';
$api = new PlaneUploadSimpleApi("RzV5azhDMVNnZVlwemkzRWxCQW1Da2xmYUdCNlZYWWJzUzVlWStYOWhyRUJVckJlSHRhTTZZUkFpeUIxRXphT3F6Wkk0dUFlb2F1VGpFS1VobGgxOHc3VWkraTNDazM5dllDNXFmUHM5SENzZ1JqZU93UVdZZE5ROXZEaitJYnd2aFBzem1KMFVtZHdCRHdPeU9MalRnPT0=");

$name = (isSet($_POST["name"]))?$_POST["name"]:""; // optional

$directory = "submittals/".$_POST["name"].date("Y-m-d H:i:s");

$button = $api->confirmAttachment($directory," from ".$name); // <--- generated button object

if (null == $button) {
    exit("Something went wrong, check if API key is valid");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PlaneUpload attachment example - result</title>
</head>
<body>
<meta http-equiv="refresh"  content="1"; URL=https://107aviation.com/guide/" />
</body>
</html>