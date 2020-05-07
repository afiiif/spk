<!DOCTYPE html>
<html lang="en" class="h-100">

<head>
<?php include 'views/partials/meta.php'; ?>
	<meta property="og:title" content="<?= $data['title'] ?> · Sistem Pencarian Kode Klasifikasi">
	<meta property="og:url" content="<?= SITE . PATH ?>/">
	<base href="<?= SITE ?>/spk/">
	<title><?= $data['title'] ?> · Sistem Pencarian Kode Klasifikasi</title>

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.min.css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.2/css/bootstrap-select.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css">
	<link rel="stylesheet" href="lib/atlantis-lite/mod/atlantis.mod.css?v=<?php include 'views/partials/_version.php'; ?>">
	<link rel="stylesheet" href="assets/css/main.css?v=<?php include 'views/partials/_version.php'; ?>">

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
</head>

<body>

<?php include 'views/partials/modal.php'; ?>

	<header class="header bg-yellow-gradient pb-6">
		<nav class="p-a p-md-3">
			<a id="nav-brand" href="" class="d-block lh-120 animated animated-1s bounceInDown">
<?php if ($data['title-segment'][2]) { ?>
				<i class="icon-arrow-left-circle"></i><span class="fw-8"><?= $data['title-segment'][0] ?></span><div><?= $data['title-segment'][1] ?></div><div><?= $data['title-segment'][2] ?></div>
<?php } else { ?>
				<i class="icon-arrow-left-circle"></i><span class="fw-8"><?= $data['title-segment'][0] ?></span><span class="fw-3"><?= $data['title-segment'][1] ?></span>
<?php } ?>
			</a>
		</nav>
		<div id="search-form-wrapper-outer" class="search-form-wrapper-outer d-none"><!-- animated animated-1s bounceIn -->
			<div class="search-form-wrapper">
				<div id="search-form-tooltip" class="search-form-tooltip"></div>
				<input id="search" type="search" class="search-form-input placeholder-black" placeholder="Masukkan kata kunci atau kode">
				<button id="search-btn" type="button" class="search-form-btn"><i class="icon-magnifier"></i></button>
				<div class="search-form-setting-wrapper">
					<button id="setting-btn" type="button" class="search-form-setting-btn"><i class="icon-settings"></i></button>
				</div>
			</div>
		</div>
		<div id="explore-wrapper" class="explore-wrapper d-none"><!-- animated animated-1s bounceInUp delay-1s -->
			<button type="button" id="explore-btn" class="btn p-2 text-black"><i class="icon-book-open"></i><span>Eksplor</span></button>
		</div>
		<div id="about-wrapper" class="about-wrapper d-none"><!-- animated animated-1s bounceInUp delay-1s -->
			<a href="javascript:void(0)" class="about-btn text-black"><i class="icon-info mr-2"></i>Tentang</a>
		</div>
		<div id="loading" class="text-center fz-32 fw-3 animated animated-1s fadeIn">
			<i class="icon-refresh mr-35 fas fa-counter-spin"></i><div class="d-inline-block dotty" style="width: 141px;">Memuat</div>
		</div>
	</header>

	<main>
		<div id="result" class="pt-4 pb-3" style="display: none;">
			<section id="result-loading">
				<div class="fz-20 mt-4 mt-md-5 text-center"><i class="icon-refresh mr-35 fas fa-counter-spin"></i>Memuat...</div>
			</section>
			<div class="mx-auto position-relative z-10 mb-45" style="max-width: 960px; display: none;">
				<div class="alert alert-info pl-3 pr-45" role="alert">
					<button type="button" aria-hidden="true" class="close" data-notify="dismiss" style="position: absolute; right: 10px; top: 5px; z-index: 1033;" id="nav-guide-dismiss">×</button>
					<div class="row row-8">
						<div class="col-auto pt-1"><i class="far fa-lightbulb text-white bg-info fz-22 rounded-circle text-center" style="width: 35px; height: 35px; line-height: 35px;"></i></div>
						<div class="col">
							<div data-notify="title" class="mb-2">Tips!</div>
							<div data-notify="message" class="text-muted">
								<div>Klik pada kode klasifikasi untuk membuka sub-kategori. <div class="d-lg-inline">Klik pada judul untuk menampilkan keterangan lengkap.</div></div>
								<div class="mt-2">Gunakan tanda petik dua (<span class="fw-7 text-info">"</span>) untuk pencarian kata gabung.<br>Contoh kasus: Dengan kata kunci <span class="fw-7">kaca mata</span>, sistem akan mencari data yang mengandung kata kaca dan kata mata secara terpisah. Sedangkan dengan kata kunci <span class="fw-7">"kaca mata"</span> (dengan tanda petik), sistem akan mencari data yang mengandung kata kaca mata.</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<section id="result-summary" style="display: none;"></section>
			<section id="result-table" style="display: none;">
				<div class="table-tree-wrapper">
					<table class="table-tree">
						<tbody id="result-table-body"></tbody>
					</table>
				</div>
			</section>
		</div>
	</main>

	<section id="about" class="d-none">
		<div><span class="fw-7">Sistem Pencarian Kode Klasifikasi</span> (<i>unofficial</i>) merupakan aplikasi berbasis website (WebApp) yang dapat dimanfaatkan untuk pencarian kode berbagai jenis klasifikasi statistik seperti <span class="text-info">KBLI</span>, <span class="text-info">KBJI</span>, dan <span class="text-info">KBKI</span>.</div>
		<div class="my-3">WebApp ini memiliki fitur pencarian klasifikasi dengan memasukkan kata kunci ataupun kode klasifikasi. Terdapat juga fitur eksplorasi yang memungkinkan pengguna melihat hierarki klasifikasi.</div>
		<div>WebApp ini dikembangkan oleh <span class="fw-6">Muhammad Afifudin</span> — Staf IPDS BPS Kabupaten Kayong Utara. Masukan terkait fitur, atau pelaporan <i>bug</i> pada WebApp ini dapat disampaikan melalui email ke <span class="fw-7 text-info">muhammad.afifudin@bps.go.id</span></div>
	</section>

	<footer class="footer">
		<a id="about-btn" class="about-btn p-2 px-md-3 text-reset ml-auto" href="javascript:void(0)"><i class="icon-info d-inline-block mr-2"></i>Tentang WebApp</a>
	</footer>

	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.2/js/bootstrap-select.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/mark.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.3.0/jszip.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.1.0/jszip-utils.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/0.8.9/jquery.csv.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.4/clipboard.min.js"></script>
	<script src="assets/js/main.js?v=<?php include 'views/partials/_version.php'; ?>"></script>
	<script>
		const DEV = <?= json_encode(SITE === 'http://localhost' || $_GET['debug'] == 1) ?>, FILE = '<?= $data['file'] ?>';
	</script>

</body>

</html>