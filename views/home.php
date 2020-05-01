<!DOCTYPE html>
<html lang="en" class="h-100">

<head>
<?php include 'views/partials/meta.php'; ?>
	<meta property="og:title" content="Sistem Pencarian Kode Klasifikasi · SPK Online Redesign!">
	<meta property="og:url" content="<?= SITE . PATH ?>/">
	<base href="<?= SITE ?>/spk/">
	<title>Sistem Pencarian Kode Klasifikasi · SPK Online Redesign!</title>

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.min.css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css">
	<link rel="stylesheet" href="lib/atlantis-lite/mod/atlantis.mod.css?v=<?php include 'views/partials/_version.php'; ?>">
	<link rel="stylesheet" href="assets/css/main.css?v=<?php include 'views/partials/_version.php'; ?>">

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>

	<style>
		body { background-attachment: fixed; min-height: 100%; }
		.col-auto>a { display: inline-block; width: 135px; text-decoration: none; position: relative; top: 0; }
		.col-auto>a:hover { top: -4px; }
		.col-auto>a:hover i { color: #F8D800 !important; }
	</style>
</head>

<body class="bg-yellow-gradient text-black d-flex align-items-center justify-content-center px-3 py-5 pb-md-55">

	<div>
		<header>
			<div class="d-flex mx--a justify-content-center d-md-none">
				<div class="col-auto pr-0"><i class="icon-eyeglass fz-48"></i></div>
				<div class="col-auto"><h1 class="fw-3 text-nowrap lh-110 fz-18 pr-3">SISTEM PENCARIAN<div class="fw-9 fz-20">KODE KLASIFIKASI</div></h1></div>
			</div>
			<div class="row justify-content-center d--md-flex">
				<div class="col-auto"><i class="icon-eyeglass fz-72"></i></div>
				<div class="col-auto"><h1 class="fw-3 text-nowrap lh-110">SISTEM PENCARIAN<div class="fw-9" style="font-size: 30px;">KODE KLASIFIKASI</div></h1></div>
			</div>
		</header>
		<main class="row row-8 row-md-10 mt-45 mt-md-55 justify-content-center text-center">
			<div class="col-auto">
				<a href="kbli-2015" class="text-reset card mb-3 mb-md-35 animated animated-1s flipInY" title="Klasifikasi Baku Lapangan Usaha Indonesia 2015" data-toggle="tooltip" data-placement="bottom" data-trigger="hover">
					<div class="card-body">
						<i class="fas fa-fw fa-briefcase fz-64"></i>
						<h2 class="fw-9 mb-0 mt-2 text-nowrap fz-16">KBLI 2015</h2>
					</div>
				</a>
			</div>
			<div class="col-auto">
				<a href="kbji-2014" class="text-reset card mb-3 mb-md-35 animated animated-1s flipInY" title="Klasifikasi Baku Jabatan Indonesia 2014" data-toggle="tooltip" data-placement="bottom" data-trigger="hover">
					<div class="card-body">
						<i class="fab fa-fw fa-black-tie fz-64"></i>
						<h2 class="fw-9 mb-0 mt-2 text-nowrap fz-16">KBJI 2014</h2>
					</div>
				</a>
			</div>
			<div class="w-100 d-md-none"></div>
			<div class="col-auto">
				<a href="kbki-barang" class="text-reset card mb-3 mb-md-35 animated animated-1s flipInY" title="Klasifikasi Baku Komoditi Indonesia Indonesia - Barang" data-toggle="tooltip" data-placement="bottom" data-trigger="hover">
					<div class="card-body">
						<i class="fas fa-fw fa-cubes fz-64"></i>
						<h2 class="fw-9 mb-0 mt-2 text-nowrap fz-16">KBKI Barang</h2>
					</div>
				</a>
			</div>
			<div class="col-auto">
				<a href="kbki-jasa" class="text-reset card mb-3 mb-md-35 animated animated-1s flipInY" title="Klasifikasi Baku Komoditi Indonesia - Jasa" data-toggle="tooltip" data-placement="bottom" data-trigger="hover">
					<div class="card-body">
						<i class="fas fa-fw fa-handshake fz-64"></i>
						<h2 class="fw-9 mb-0 mt-2 text-nowrap fz-16">KBKI Jasa</h2>
					</div>
				</a>
			</div>
			<div class="w-100"></div>
			<div class="col-auto">
				<a href="kbli-2009" class="text-reset card mb-3 mb-md-35 animated animated-1s flipInY" style="background-color: rgba(255,255,255,.8);" title="Klasifikasi Baku Lapangan Usaha Indonesia 2009" data-toggle="tooltip" data-placement="bottom" data-trigger="hover">
					<div class="card-body">
						<i class="fas fa-fw fa-briefcase fz-64 text-muted"></i>
						<h2 class="fw-9 mb-0 mt-2 text-nowrap fz-16">KBLI 2009</h2>
					</div>
				</a>
			</div>
			<div class="col-auto">
				<a href="kbli-2005" class="text-reset card mb-3 mb-md-35 animated animated-1s flipInY" style="background-color: rgba(255,255,255,.8);" title="Klasifikasi Baku Lapangan Usaha Indonesia 2005" data-toggle="tooltip" data-placement="bottom" data-trigger="hover">
					<div class="card-body">
						<i class="fas fa-fw fa-briefcase fz-64 text-muted"></i>
						<h2 class="fw-9 mb-0 mt-2 text-nowrap fz-16">KBLI 2005</h2>
					</div>
				</a>
			</div>
			<div class="col-auto">
				<a href="kbji-2002" class="text-reset card mb-3 mb-md-35 animated animated-1s flipInY" style="background-color: rgba(255,255,255,.8);" title="Klasifikasi Baku Jabatan Indonesia 2002" data-toggle="tooltip" data-placement="bottom" data-trigger="hover">
					<div class="card-body">
						<i class="fab fa-fw fa-black-tie fz-64 text-muted"></i>
						<h2 class="fw-9 mb-0 mt-2 text-nowrap fz-16">KBJI 2002</h2>
					</div>
				</a>
			</div>
		</main>
	</div>

	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	<script>
		$(() => {
			console.log('© Muhammad Afifudin, 2020');
			$('body').tooltip({ selector: '[data-toggle="tooltip"]', html: true });
		});
	</script>

</body>

</html>