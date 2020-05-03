document.addEventListener('DOMContentLoaded', function () {

	const ELM = {
		body: document.getElementsByTagName('body')[0],
		search: document.getElementById('search'),
		search_tooltip: $('#search-form-tooltip'),
		result_loading: document.getElementById('result-loading'),
		result_summary: document.getElementById('result-summary'),
		result_table: document.getElementById('result-table'),
		result_table_body: document.getElementById('result-table-body'),
	}

	var data = [];

	{
		const ext = 'json';

		const success = filecontent => {
			dbg(`Success read ${FILE}.${ext}`, 0);

			if (ext === 'csv') {
				$.csv.toArrays(filecontent).forEach(a => {
					let id = '',
						fid = '' + a[0],
						parent_id = '',
						parent_fid = '';
					if (a[0] !== a[1]) {
						id = a[1];
						fid += '' + id;
						let test_id = fid.substr(0, fid.length - 1),
							parent = data.find(b => b.fid === test_id);
						if (parent) {
							parent_id = parent.id;
							parent_fid = parent.fid;
						}
						else {
							test_id = fid.substr(0, fid.length - 2);
							parent = data.find(b => b.fid === test_id);
							if (parent) {
								parent_id = parent.id;
								parent_fid = parent.fid;
							}
						}
					}
					data.push({
						id,
						fid,
						title: a[2],
						desc: a[3],
						parent_id,
						parent_fid,
					});
				});
				data.sort((a, b) => a.fid < b.fid ? -1 : 1);
			}
			else if (ext === 'json') {
				data = JSON.parse(filecontent);
			}

			let digits = [...new Set(data.map(a => a.fid.length))];
			data.forEach(a => {
				a.lv = digits.findIndex(b => b === a.fid.length);
				a.last = a.lv === digits.length - 1;
			});

			dbg(data);

			document.getElementById('loading').style.display = 'none';
			document.getElementById('search-form-wrapper-outer').className = 'search-form-wrapper-outer animated animated-1s bounceIn';
			document.getElementById('explore-wrapper').className = 'explore-wrapper animated animated-1s bounceInUp';

			let params = (new URL(location.href)).searchParams;
			if (params.get('q')) {
				ELM.search.value = params.get('q');
				document.getElementById('search-btn').click();
			}
			else if (params.get('explore')) {
				document.getElementById('explore-btn').click();
			}
			else ELM.search.focus();
		}

		const error = err => {
			console.error(err);
			document.getElementById('loading').innerHTML = '<div class="animated animated-1s swing"><i class="icon-exclamation mr-35"></i>Terjadi kesalahan :(</div><div class="animated fast fadeInUp delay-1s fz-14 fw-4 mt-45 px-a"><div class="fz-20">Silakan coba refresh halaman ini.</div>Jika masih terjadi masalah, hubungi Admin (<span class="text-warning">muhammad.afifudin@bps.go.id</span>)</div>';
			document.getElementsByTagName('header')[0].className = 'header bg-danger-gradient pb-6';
		}

		dbg(`Requesting zipped ${ext}...\nassets/${ext}/` + FILE, 2);
		let promise = new JSZip.external.Promise(function (resolve, reject) {
			JSZipUtils.getBinaryContent(`assets/${ext}/${FILE}.zip`, function (err, data) {
				if (err) reject(err);
				else resolve(data);
			});
		});

		promise.then(JSZip.loadAsync)
			.then(function (zip) {
				dbg(zip);
				return zip.file(`${FILE}.${ext}`).async('string');
			})
			.then(success, error);
	}

	// Search
	{
		var setting = { cat: [], dark: false };

		if (typeof (Storage) !== 'undefined') {
			if (localStorage.getItem('dark')) {
				ELM.body.classList.add('dark-mode');
				document.querySelector('meta[name="theme-color"]').setAttribute('content', '#202124');
				setting.dark = true;
			}
		}

		const markInstance = new Mark(ELM.result_table_body);

		ELM.search.addEventListener('keypress', function (e) {
			ELM.search_tooltip.tooltip('hide');
			if (e.which === 13) search(ELM.search.value);
		}, false);
		ELM.search.addEventListener('blur', function () { ELM.search_tooltip.tooltip('hide'); }, false);
		document.getElementById('search-btn').addEventListener('click', function () { search(ELM.search.value); }, false);
		const search = keyword => {

			let commonWord = ('kelompok,kategori,subgolongan,golongan,mencakup,kegiatan,lihat,sejenisnya,' + 'ada,adalah,adanya,adapun,agak,agaknya,agar,akan,akankah,akhir,akhiri,akhirnya,aku,akulah,amat,amatlah,anda,andalah,antar,antara,antaranya,apa,apaan,apabila,apakah,apalagi,apatah,artinya,asal,asalkan,atas,atau,ataukah,ataupun,awal,awalnya,bagai,bagaikan,bagaimana,bagaimanakah,bagaimanapun,bagi,bagian,bahkan,bahwa,bahwasanya,baik,bakal,bakalan,balik,banyak,bapak,baru,bawah,beberapa,begini,beginian,beginikah,beginilah,begitu,begitukah,begitulah,begitupun,bekerja,belakang,belakangan,belum,belumlah,benar,benarkah,benarlah,berada,berakhir,berakhirlah,berakhirnya,berapa,berapakah,berapalah,berapapun,berarti,berawal,berbagai,berdatangan,beri,berikan,berikut,berikutnya,berjumlah,berkali-kali,berkata,berkehendak,berkeinginan,berkenaan,berlainan,berlalu,berlangsung,berlebihan,bermacam,bermacam-macam,bermaksud,bermula,bersama,bersama-sama,bersiap,bersiap-siap,bertanya,bertanya-tanya,berturut,berturut-turut,bertutur,berujar,berupa,besar,betul,betulkah,biasa,biasanya,bila,bilakah,bisa,bisakah,boleh,bolehkah,bolehlah,buat,bukan,bukankah,bukanlah,bukannya,bulan,bung,cara,caranya,cukup,cukupkah,cukuplah,cuma,dahulu,dalam,dan,dapat,dari,daripada,datang,dekat,demi,demikian,demikianlah,dengan,depan,di,dia,diakhiri,diakhirinya,dialah,diantara,diantaranya,diberi,diberikan,diberikannya,dibuat,dibuatnya,didapat,didatangkan,digunakan,diibaratkan,diibaratkannya,diingat,diingatkan,diinginkan,dijawab,dijelaskan,dijelaskannya,dikarenakan,dikatakan,dikatakannya,dikerjakan,diketahui,diketahuinya,dikira,dilakukan,dilalui,dilihat,dimaksud,dimaksudkan,dimaksudkannya,dimaksudnya,diminta,dimintai,dimisalkan,dimulai,dimulailah,dimulainya,dimungkinkan,dini,dipastikan,diperbuat,diperbuatnya,dipergunakan,diperkirakan,diperlihatkan,diperlukan,diperlukannya,dipersoalkan,dipertanyakan,dipunyai,diri,dirinya,disampaikan,disebut,disebutkan,disebutkannya,disini,disinilah,ditambahkan,ditandaskan,ditanya,ditanyai,ditanyakan,ditegaskan,ditujukan,ditunjuk,ditunjuki,ditunjukkan,ditunjukkannya,ditunjuknya,dituturkan,dituturkannya,diucapkan,diucapkannya,diungkapkan,dong,dua,dulu,empat,enggak,enggaknya,entah,entahlah,guna,gunakan,hal,hampir,hanya,hanyalah,hari,harus,haruslah,harusnya,hendak,hendaklah,hendaknya,hingga,ia,ialah,ibarat,ibaratkan,ibaratnya,ibu,ikut,ingat,ingat-ingat,ingin,inginkah,inginkan,ini,inikah,inilah,itu,itukah,itulah,jadi,jadilah,jadinya,jangan,jangankan,janganlah,jauh,jawab,jawaban,jawabnya,jelas,jelaskan,jelaslah,jelasnya,jika,jikalau,juga,jumlah,jumlahnya,justru,kala,kalau,kalaulah,kalaupun,kalian,kami,kamilah,kamu,kamulah,kan,kapan,kapankah,kapanpun,karena,karenanya,kasus,kata,katakan,katakanlah,katanya,ke,keadaan,kebetulan,kecil,kedua,keduanya,keinginan,kelamaan,kelihatan,kelihatannya,kelima,keluar,kembali,kemudian,kemungkinan,kemungkinannya,kenapa,kepada,kepadanya,kesampaian,keseluruhan,keseluruhannya,keterlaluan,ketika,khususnya,kini,kinilah,kira,kira-kira,kiranya,kita,kitalah,kok,kurang,lagi,lagian,lah,lain,lainnya,lalu,lama,lamanya,lanjut,lanjutnya,lebih,lewat,lima,luar,macam,maka,makanya,makin,malah,malahan,mampu,mampukah,mana,manakala,manalagi,masa,masalah,masalahnya,masih,masihkah,masing,masing-masing,mau,maupun,melainkan,melakukan,melalui,melihat,melihatnya,memang,memastikan,memberi,memberikan,membuat,memerlukan,memihak,meminta,memintakan,memisalkan,memperbuat,mempergunakan,memperkirakan,memperlihatkan,mempersiapkan,mempersoalkan,mempertanyakan,mempunyai,memulai,memungkinkan,menaiki,menambahkan,menandaskan,menanti,menanti-nanti,menantikan,menanya,menanyai,menanyakan,mendapat,mendapatkan,mendatang,mendatangi,mendatangkan,menegaskan,mengakhiri,mengapa,mengatakan,mengatakannya,mengenai,mengerjakan,mengetahui,menggunakan,menghendaki,mengibaratkan,mengibaratkannya,mengingat,mengingatkan,menginginkan,mengira,mengucapkan,mengucapkannya,mengungkapkan,menjadi,menjawab,menjelaskan,menuju,menunjuk,menunjuki,menunjukkan,menunjuknya,menurut,menuturkan,menyampaikan,menyangkut,menyatakan,menyebutkan,menyeluruh,menyiapkan,merasa,mereka,merekalah,merupakan,meski,meskipun,meyakini,meyakinkan,minta,mirip,misal,misalkan,misalnya,mula,mulai,mulailah,mulanya,mungkin,mungkinkah,nah,naik,namun,nanti,nantinya,nyaris,nyatanya,oleh,olehnya,pada,padahal,padanya,pak,paling,panjang,pantas,para,pasti,pastilah,penting,pentingnya,per,percuma,perlu,perlukah,perlunya,pernah,persoalan,pertama,pertama-tama,pertanyaan,pertanyakan,pihak,pihaknya,pukul,pula,pun,punya,rasa,rasanya,rata,rupanya,saat,saatnya,saja,sajalah,saling,sama,sama-sama,sambil,sampai,sampai-sampai,sampaikan,sana,sangat,sangatlah,satu,saya,sayalah,se,sebab,sebabnya,sebagai,sebagaimana,sebagainya,sebagian,sebaik,sebaik-baiknya,sebaiknya,sebaliknya,sebanyak,sebegini,sebegitu,sebelum,sebelumnya,sebenarnya,seberapa,sebesar,sebetulnya,sebisanya,sebuah,sebut,sebutlah,sebutnya,secara,secukupnya,sedang,sedangkan,sedemikian,sedikit,sedikitnya,seenaknya,segala,segalanya,segera,seharusnya,sehingga,seingat,sejak,sejauh,sejenak,sejumlah,sekadar,sekadarnya,sekali,sekali-kali,sekalian,sekaligus,sekalipun,sekarang,sekecil,seketika,sekiranya,sekitar,sekitarnya,sekurang-kurangnya,sekurangnya,sela,selagi,selain,selaku,selalu,selama,selama-lamanya,selamanya,selanjutnya,seluruh,seluruhnya,semacam,semakin,semampu,semampunya,semasa,semasih,semata,semata-mata,semaunya,sementara,semisal,semisalnya,sempat,semua,semuanya,semula,sendiri,sendirian,sendirinya,seolah,seolah-olah,seorang,sepanjang,sepantasnya,sepantasnyalah,seperlunya,seperti,sepertinya,sepihak,sering,seringnya,serta,serupa,sesaat,sesama,sesampai,sesegera,sesekali,seseorang,sesuatu,sesuatunya,sesudah,sesudahnya,setelah,setempat,setengah,seterusnya,setiap,setiba,setibanya,setidak-tidaknya,setidaknya,setinggi,seusai,sewaktu,siap,siapa,siapakah,siapapun,sini,sinilah,soal,soalnya,suatu,sudah,sudahkah,sudahlah,supaya,tadi,tadinya,tahu,tahun,tak,tambah,tambahnya,tampak,tampaknya,tandas,tandasnya,tanpa,tanya,tanyakan,tanyanya,tapi,tegas,tegasnya,telah,tempat,tengah,tentang,tentu,tentulah,tentunya,tepat,terakhir,terasa,terbanyak,terdahulu,terdapat,terdiri,terhadap,terhadapnya,teringat,teringat-ingat,terjadi,terjadilah,terjadinya,terkira,terlalu,terlebih,terlihat,termasuk,ternyata,tersampaikan,tersebut,tersebutlah,tertentu,tertuju,terus,terutama,tetap,tetapi,tiap,tiba,tiba-tiba,tidak,tidakkah,tidaklah,tiga,tinggi,toh,tunjuk,turut,tutur,tuturnya,ucap,ucapnya,ujar,ujarnya,umum,umumnya,ungkap,ungkapnya,untuk,usah,usai,waduh,wah,wahai,waktu,waktunya,walau,walaupun,wong,yaitu,yakin,yakni,yang').split(','),
				keysUnfiltered = [...new Set(keyword.trim().toLowerCase().split(/[\s,]+/))].filter(a => a.length),
				keys = keysUnfiltered.filter(a => !commonWord.includes(a)).map(a => a.replace(/\+/g, ' ')),
				findById = keys.length === 1 && /^\d{2,10}$/.test(keys[0]);
			dbg('Search: ' + keyword, 0);
			dbg({ keysUnfiltered, keys });

			if (keys.filter(a => a.length > 2).length || keys.filter(a => a.length > 1).length > 1 || keys.length > 3 || findById) {
				dbg('Good keyword :)', 1);

				setTimeout(() => {

					let data2 = $.extend(true, [], data),
						res = [];
					if (keys.length > 1 && keys.every(a => /^\d{2,7}$/.test(a))) { keys = [keys.join('')]; findById = true; }

					if (findById) {
						let node = data2.find(a => a.id == keys[0]);
						if (node) {
							let current_fid = node.parent_fid,
								parents = [],
								childs = data2.filter(a => a.parent_fid === node.fid);
							while (current_fid) {
								let p = data2.find(a => a.fid === current_fid);
								parents.unshift(p);
								current_fid = p.parent_fid;
							}
							res = [...parents, { ...node, displayed: true, collapsed: true }, ...childs.map(a => ({ ...a, hidden: true }))];
						}
					}
					else {
						data2.reverse().forEach(a => {
							let content = (a.title + a.desc).toLowerCase();
							if (keys.every(key => content.includes(key))) {
								let node = res.find(b => b.fid === a.fid);
								if (node) node.displayed = true;
								else {
									res.push({ ...a, displayed: true, last: true });
									let current_fid = a.parent_fid,
										parents = [];
									while (current_fid) {
										let p = data2.find(a => a.fid === current_fid);
										parents.unshift(p);
										current_fid = p.parent_fid;
									}
									res = res.concat(parents);
								}
							}
						});
						if (res.length) {
							res = res.filter((a, i, self) => i === self.findIndex(b => b.fid === a.fid));
							res.sort((a, b) => a.fid < b.fid ? -1 : 1);
						}
					}

					const b = text => `<b class="fw-6">${text}</b>`;

					if (res.length) {

						let html = res.map(b => `
							<tr data-lv="${b.lv}" data-fid="${b.fid}"
								class="${b.desc.length ? 'desc' : ''} ${b.displayed ? 'desc-exp' : 'mini'} ${b.last || b.hidden ? '' : (b.collapsed ? 'toggle' : 'toggle toggle-exp')}"
								${b.hidden ? 'style="display:none"' : ''}>
								<td><div>${b.parent_id}<b>${b.id.substr(b.parent_id.length) || b.fid}</b></div></td>
								<td><div class="desc-toggle">${b.title}</div><span class="desc-container">${descHtml(b.desc, b.id)}</span></td>
							</tr>`
						).join('');

						ELM.search.blur();
						ELM.result_summary.innerHTML = findById ?
							`<div>Menampilkan hasil pencarian dengan kode <span class="text-info">${b(keyword)}</span></div>` :
							`<div class="text-info">Menemukan ${b(res.filter(a => a.displayed).length)} hasil.</div>`;
						ELM.result_table_body.innerHTML = html;
						ELM.result_table.style.display = '';
						if (!findById) keys.forEach(a => markInstance.mark(a, { separateWordSearch: false }));

						// Clipboard.js
						document.querySelectorAll('.copy-btn').forEach(a => {
							new ClipboardJS(a, { text: () => location.origin + location.pathname + '?q=' + a.dataset.text });
							a.addEventListener('click', function () {
								a.innerHTML = '<i class="fas fa-check mr-2"></i>Tautan disalin';
								a.classList.add('btn-success');
								a.classList.remove('btn-warning');
								setTimeout(() => {
									a.innerHTML = '<i class="fas fa-share-alt mr-2"></i>Bagikan';
									a.classList.add('btn-warning');
									a.classList.remove('btn-success');
								}, 2000);
							}, false);
						});
					}
					else {
						ELM.result_summary.innerHTML = `<div class="text-danger text-center pt-45 pt-sm-5 pl-md-55"><div class="mb-4 fz-72 fz-sm-80"><div class="icon-stack-file-times animated animated-1s swing"><div></div></div></div>Tidak ada hasil untuk pencarian ${b(keyword)}</div>`;
					}

					ELM.result_loading.style.display = 'none';
					ELM.result_summary.style.display = '';

				}, ELM.body.classList.contains('search-active') ? 200 : 600);

				ELM.result_table.style.display = 'none';
				ELM.result_summary.style.display = 'none';
				ELM.result_loading.style.display = '';
				ELM.body.classList.add('search-active');
				$('#result').slideDown();
				ELM.search_tooltip.tooltip('hide');
			}
			else {
				if (keyword) {
					dbg('Bad keyword :(', 1);
					ELM.search_tooltip.tooltip('show');
				}
				ELM.search.focus();
			}
		}

		const updateSetting = (newSetting = false) => {
			if (newSetting) setting = newSetting;
			else setting = { cat: [], dark: false };
			document.getElementById('setting-btn').classList[setting.cat.length === 0 ? 'remove' : 'add']('text-secondary');
		}
		document.getElementById('setting-btn').addEventListener('click', function () {
			ELM.search_tooltip.tooltip('hide');
			// let { lv, pr, dark, prefix } = setting;
			// utils.modal.init({
			// 	title: 'Pengaturan',
			// 	body: /*html*/`
			// 		<div class="fw-6 mb-2">Cari sampai tingkat:</div>
			// 		<div>
			// 			<div class="custom-control custom-radio custom-control-inline d-block d-sm-inline-flex">
			// 				<input type="radio" id="setting-lv-1" name="setting-lv" value="1" class="custom-control-input"${lv === '1' ? ' checked' : ''}>
			// 				<label class="custom-control-label d-block cur-p" for="setting-lv-1">Kabupaten/Kota</label>
			// 			</div>
			// 			<div class="custom-control custom-radio custom-control-inline d-block d-sm-inline-flex">
			// 				<input type="radio" id="setting-lv-2" name="setting-lv" value="2" class="custom-control-input"${lv === '2' ? ' checked' : ''}>
			// 				<label class="custom-control-label d-block cur-p" for="setting-lv-2">Kecamatan</label>
			// 			</div>
			// 			<div class="custom-control custom-radio custom-control-inline d-block d-sm-inline-flex">
			// 				<input type="radio" id="setting-lv-3" name="setting-lv" value="3" class="custom-control-input"${lv === '3' ? ' checked' : ''}>
			// 				<label class="custom-control-label d-block cur-p" for="setting-lv-3">Desa/Kelurahan</label>
			// 			</div>
			// 		</div>
			// 		<div class="fw-6 mt-4 mb-2">Cari di:</div>
			// 		<div>
			// 			<select id="setting-pr" class="selectpicker" title="Semua Provinsi" data-width="100%" data-live-search="true" multiple>${data.map(a => `<option value="${a.id}" data-subtext="(${a.id})"${pr.includes(a.id) ? ' selected' : ''}>${a.name}</option>`).join('')}</select>
			// 		</div>
			// 		<div class="mx--3 mt-3 mb--3 py-3 border-top" id="dark-mode-wrapper">
			// 			<div class="px-3">
			// 				<div class="fw-6 mb-2">Tampilan:</div>
			// 				<div class="custom-control custom-switch">
			// 					<input type="checkbox" class="custom-control-input" id="dark-mode-toggle"${dark ? ' checked' : ''}>
			// 					<label class="custom-control-label cur-p d-block" for="dark-mode-toggle">Mode gelap</label>
			// 				</div>
			// 				<div class="custom-control custom-switch">
			// 					<input type="checkbox" class="custom-control-input" id="prefix-toggle"${prefix ? ' checked' : ''}>
			// 					<label class="custom-control-label cur-p d-block" for="prefix-toggle">Tampilkan prefix<div class="fz-12 fw-3">(Misal: "Kayong Utara" ditampilkan dengan "<span class="fw-4">Kabupaten</span> Kayong Utara")</div></label>
			// 				</div>
			// 			</div>
			// 		</div>
			// 	`,
			// 	btnLabel: 'Simpan',
			// 	show: () => {
			// 		document.getElementById('dark-mode-toggle').addEventListener('change', function (e) {
			// 			if (this.checked) {
			// 				ELM.body.classList.add('dark-mode');
			// 				document.querySelector('meta[name="theme-color"]').setAttribute('content', '#202124');
			// 			} else {
			// 				ELM.body.classList.remove('dark-mode');
			// 				document.querySelector('meta[name="theme-color"]').setAttribute('content', '#F8D800');
			// 			}
			// 		}, false);
			// 	},
			// 	action: () => {
			// 		updateSetting({
			// 			lv: $('[name="setting-lv"]:checked').val(),
			// 			pr: $('#setting-pr').val(),
			// 			dark: document.getElementById('dark-mode-toggle').checked,
			// 			prefix: document.getElementById('prefix-toggle').checked,
			// 		});
			// 		utils.modal.hide();
			// 		dbg(setting);
			// 	},
			// 	hide: () => {
			// 		if (ELM.result_summary.style.display === '') search(ELM.search.value);
			// 		if (setting.dark) {
			// 			ELM.body.classList.add('dark-mode');
			// 			document.querySelector('meta[name="theme-color"]').setAttribute('content', '#202124');
			// 			if (typeof (Storage) !== 'undefined') localStorage.setItem('dark', 1);
			// 		} else {
			// 			ELM.body.classList.remove('dark-mode');
			// 			document.querySelector('meta[name="theme-color"]').setAttribute('content', '#F8D800');
			// 			if (typeof (Storage) !== 'undefined') localStorage.removeItem('dark');
			// 		}
			// 		if (setting.prefix) {
			// 			ELM.result_table_body.classList.add('with-prefix');
			// 			if (typeof (Storage) !== 'undefined') localStorage.setItem('prefix', 1);
			// 		} else {
			// 			ELM.result_table_body.classList.remove('with-prefix');
			// 			if (typeof (Storage) !== 'undefined') localStorage.removeItem('prefix');
			// 		}
			// 	},
			// });
		}, false);
	}

	// Explore
	document.getElementById('explore-btn').addEventListener('click', function () {
		ELM.search.value = '';
		ELM.result_summary.style.display = 'none';
		ELM.result_table.style.display = 'none';
		ELM.result_loading.style.display = '';
		ELM.search_tooltip.tooltip('hide');
		setTimeout(() => {
			ELM.result_table_body.innerHTML = data.filter(a => a.id === '').map(a => `<tr data-lv="0" class="toggle toggle-explore desc" data-fid="${a.fid}"><td><div>${a.fid}</div></td><td><div class="desc-toggle">${a.title}</div><span class="desc-container">${descHtml(a.desc)}</span></td></tr>`).join('');
			ELM.result_loading.style.display = 'none';
			ELM.result_table.style.display = '';
		}, ELM.body.classList.contains('search-active') ? 200 : 600);
		ELM.body.classList.add('search-active');
		$('#result').slideDown();
	}, false);

	// Toggle
	ELM.result_table_body.addEventListener('click', function (e) {
		for (var target = e.target; target && target != this; target = target.parentNode) {

			if (target.matches('a[data-id]') || target.matches('.desc-container')) break;

			if (target.matches('td:last-child')) {
				if (target.parentNode.classList.contains('desc')) target.parentNode.classList.toggle('desc-exp');
				break;
			}

			if (target.matches('td:first-child')) {
				let tr = target.parentNode,
					d = tr.dataset;
				dbg(d);
				if (tr.classList.contains('toggle-exp')) {
					document.querySelectorAll(`[data-fid^="${d.fid}"]`).forEach(a => { a.classList.remove('toggle-exp', 'desc-exp'); a.style.display = 'none'; });
					tr.style.display = '';
					break;
				}
				if (tr.classList.contains('toggle-explore')) {
					tr.classList.remove('toggle-explore', 'desc-exp');
					tr.classList.add('toggle-exp');
					tr.outerHTML += data
						.filter(a => a.parent_fid === d.fid)
						.map(b => `
							<tr data-lv="${b.lv}" data-fid="${b.fid}"
								class="${b.last ? '' : 'toggle toggle-explore'} ${b.desc.length ? 'desc' : ''}">
								<td>${b.parent_id}<b>${b.id.substr(b.parent_id.length)}</b></td>
								<td><div class="desc-toggle">${b.title}</div><span class="desc-container">${descHtml(b.desc, b.id)}</span></td>
							</tr>`
						).join('');
					// Clipboard.js
					document.querySelectorAll('.copy-btn').forEach(a => {
						new ClipboardJS(a, { text: () => location.origin + location.pathname + '?q=' + a.dataset.text });
						a.addEventListener('click', function () {
							a.innerHTML = '<i class="fas fa-check mr-2"></i>Tautan disalin';
							a.classList.add('btn-success');
							a.classList.remove('btn-warning');
							setTimeout(() => {
								a.innerHTML = '<i class="fas fa-share-alt mr-2"></i>Bagikan';
								a.classList.add('btn-warning');
								a.classList.remove('btn-success');
							}, 2000);
						}, false);
					});
					break;
				}
				if (tr.classList.contains('toggle')) {
					document.querySelectorAll(`[data-fid^="${d.fid}"][data-lv="${Number(d.lv) + 1}"]`).forEach(a => { a.style.display = ''; });
					tr.classList.remove('desc-exp');
					tr.classList.add('toggle-exp');
					break;
				}
				break;
			}

		}
	}, false);

	// Beautify description
	const descHtml = (desc, id = '') => desc ?
		desc
			.replace(/meliputi \:/g, 'meliputi:')
			.replace(/ -\s?\t/g, '<br>•&nbsp;&nbsp; ')
			.replace(/( \w\) )/g, '<br><span class="text-gray">$1</span>&nbsp;')
			.replace(/(\d{4,9})/g, '<a href="javascript:void(0)" data-id="$1">$1</a>')
		+ (id ? `<a href="javascript:void(0)" class="btn btn-warning copy-btn" data-text="${id}"><i class="fas fa-link mr-15"></i>Bagikan</a>` : '')
		: '';

	// Modal
	ELM.body.addEventListener('click', function (e) {
		for (var target = e.target; target && target != this; target = target.parentNode) {

			if (target.matches('a[data-id]')) {
				let { id } = target.dataset,
					node = data.find(a => a.id === id);
				dbg(id, 0);
				if (node) utils.modal.init({
					title: id,
					body: `
						<div class="fw-7 mb-25">${node.title}</div>
						<div class="fz-12">${descHtml(node.desc)}</div>
					`,
					dialogClass: 'modal-lg',
					btnCloseLabel: 'Tutup',
					btnLabel: '<i class="fas fa-share-alt mr-2"></i>Bagikan',
					show: () => {
						new ClipboardJS('#modal-btn', { text: () => location.origin + location.pathname + '?q=' + id });
					},
					action: () => {
						document.getElementById('modal-btn').innerHTML = '<i class="fas fa-check mr-2"></i>Tautan disalin';
						document.getElementById('modal-btn').classList.add('btn-success');
						document.getElementById('modal-btn').classList.remove('btn-warning');
						setTimeout(() => {
							document.getElementById('modal-btn').innerHTML = '<i class="fas fa-share-alt mr-2"></i>Bagikan';
							document.getElementById('modal-btn').classList.add('btn-warning');
							document.getElementById('modal-btn').classList.remove('btn-success');
						}, 2000);
					},
				});
				else utils.modal.init({
					title: id,
					body: `
						<div class="d-flex justify-content-center flex-wrap">
							<div class="mb-4 fz-72 fz-sm-80"><div class="icon-stack-file-times animated animated-1s swing"><div></div></div></div>
						</div>
						<div class="w-100 text-danger text-center mt--2">Sistem tidak dapat menemukan kode <span class="fw-7">0123</span></div>
					`,
					dialogClass: 'modal-sm',
					btnCloseLabel: 'Tutup',
					btnClass: 'd-none',
				});
				break;
			}
		}
	}, false);

	// Tooltip
	ELM.search_tooltip.tooltip({
		title: 'Gunakan kata kunci yang lebih spesifik',
		trigger: 'manual',
		placement: 'bottom',
	});

	// About
	document.getElementById('about-btn').addEventListener('click', function () {
		utils.modal.init({
			dialogClass: 'modal-sm',
			title: 'Tentang',
			body: /*html*/`
				<div class="mb-3">Lorem ipsum ... yang dikembangkan oleh <span class="fw-6">Muhammad Afifudin</span> (Staf IPDS BPS Kabupaten Kayong Utara). 😎</div>
				<div>Dolor sit amet lalalala~</div>`,
			btnCloseLabel: 'Tutup',
			btnClass: 'd-none',
		});
	}, false);

	// Shortcut
	document.addEventListener('keypress', function (e) {
		if (e.target !== ELM.search && e.key.toLocaleLowerCase() === 'f') ELM.search.select();
	});

});