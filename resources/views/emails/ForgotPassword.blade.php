<!DOCTYPE html>
<html>
<head>
<title>Reset Password Email</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style>
    body{
        padding: 1em 2em;
    }
    button{
        margin: 1em 0;
        background: #e20574;
        border: none;
        padding: 1em 2em;
        color: #fff;
        border-radius: 5px;
    }
    button a{
        color: #fff;
        text-decoration: none;
    }
    a.ssy{
        color:  #e20574;
    }
    .logo-img{
        max-width: 130px;
        height: auto;
    }
</style>
	
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
    <h2>Welcome, {{ $user->name }}</h2>
    <p>We are happy to have you onboard with us. </p>
    <p>Please click on the below button to reset your password.</p><br>
    <!-- <a href="{{ url('http://saukhyam.xyz/resetPassword', $token)}}"><button>Reset Password</button></a><br> -->
    <a href="{{ url('/resetPassword', $token)}}"><button>Reset Password</button></a><br>
    <p>Thanks a lot</p>
    <h2>Team Saukhyam</h2>
		
</body>
</html> 


