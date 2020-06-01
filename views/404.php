<!DOCTYPE html>
<html lang="en" class="h-100">

<head>
<?php include 'views/partials/meta.php'; ?>
	<meta property="og:title" content="Halaman Tidak Ditemukan">
	<meta property="og:url" content="<?= SITE . PATH ?>/">
	<base href="<?= SITE ?>/spk/">
	<title>Halaman Tidak Ditemukan</title>

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.min.css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap">
	<link rel="stylesheet" href="lib/atlantis-lite/mod-2/atlantis.mod.css">
	<link rel="stylesheet" href="assets/css/main<?= SITE === 'http://localhost' || $_GET['debug'] == 1 ? '' : '.min' ?>.css?v=<?php include 'views/partials/_version.php'; ?>">

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>

<body class="h-100 bg-yellow-gradient">

	<div class="d-flex align-items-center justify-content-center h-100 text-center">
		<div class="mb-4">
			<h1 style="color: #272727; font-weight: 600; font-size: 6rem; margin-bottom: 0;">404</h1>
			<h1 style="color: #272727;">Halaman Tidak Ditemukan :(</h1>
			<a href="" class="btn btn-light btn-border btn-shadow mt-4 mb-5 rounded-pill"><i class="fas fa-arrow-left mr-2"></i>Kembali ke Beranda</a>
		</div>
	</div>

	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js"></script>

</body>

</html>