document.addEventListener('DOMContentLoaded', function () {

	const $$ = {
		search: document.getElementById('search'),
		search_tooltip: $('#search-form-tooltip'),
		result_loading: document.getElementById('result-loading'),
		result_summary: document.getElementById('result-summary'),
		result_table: document.getElementById('result-table'),
		result_table_body: document.getElementById('result-table-body'),
	}

	var data = [],
		displayNavGuide = true;

	{
		const [filename, ext] = FILE.split('.');

		const success = filecontent => {
			dbg(`Success read ${filename}.${ext}`, 0);

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
							else {
								test_id = fid.substr(0, fid.length - 3);
								parent = data.find(b => b.fid === test_id);
								if (parent) {
									parent_id = parent.id;
									parent_fid = parent.fid;
								}
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
				// dbg(data.map(a => a.fid));
			}
			else if (ext === 'json') {
				data = JSON.parse(filecontent);
			}

			let digits = [...new Set(data.map(a => a.fid.length))];
			dbg(digits);
			data.forEach(a => {
				a.lv = digits.findIndex(b => b === a.fid.length);
				a.last = a.lv === digits.length - 1;
			});

			dbg(data);

			document.getElementById('loading').style.display = 'none';
			document.getElementById('search-form-wrapper-outer').className = 'search-form-wrapper-outer animated animated-1s bounceIn';
			document.getElementById('explore-wrapper').className = 'explore-wrapper animated animated-1s bounceInUp';
			document.getElementById('about-wrapper').className = 'about-wrapper animated animated-1s bounceInUp';

			let params = (new URL(location.href)).searchParams;
			if (params.get('q')) {
				$$.search.value = params.get('q');
				document.getElementById('search-btn').click();
				displayNavGuide = false;
			}
			else if (params.get('explore')) {
				document.getElementById('explore-btn').click();
			}
			else $$.search.focus();

			if (DEV && params.get('save-json') == 1) {
				function download(content, fileName, contentType) {
					var a = document.createElement('a');
					var file = new Blob([content], { type: contentType });
					a.href = URL.createObjectURL(file);
					a.download = fileName;
					a.click();
				}
				download(JSON.stringify(data), filename + '.json', 'text/plain');
			}
		}

		const error = err => {
			console.error(err);
			document.getElementById('loading').innerHTML = '<div class="animated animated-1s swing"><i class="icon-exclamation mr-35"></i>Terjadi kesalahan :(</div><div class="animated fast fadeInUp delay-1s fz-14 fw-4 mt-45 px-a"><div class="fz-20">Silakan coba refresh halaman ini.</div>Jika masih terjadi masalah, hubungi developer situs ini melalui <a href="https://github.com/afiiif/spk/issues" class="text-warning">GitHub</a>.</div>';
			document.getElementsByTagName('header')[0].className = 'header bg-danger-gradient pb-6';
		}

		dbg(`Requesting data...\nassets/${ext}/${filename}.zip`, 2);
		let promise = new JSZip.external.Promise(function (resolve, reject) {
			JSZipUtils.getBinaryContent(`assets/${ext}/${filename}.zip`, function (err, data) {
				if (err) reject(err);
				else resolve(data);
			});
		});

		promise.then(JSZip.loadAsync)
			.then(function (zip) {
				dbg(zip);
				return zip.file(`${filename}.${ext}`).async('string');
			})
			.then(success, error);
	}

	// Search
	{
		var setting = { cat: [], stopword: true, highlight: true, dark: false };

		if (typeof (Storage) !== 'undefined') {
			if (localStorage.getItem('spk-dark')) {
				document.body.classList.add('dark-mode');
				document.querySelector('meta[name="theme-color"]').setAttribute('content', '#202124');
				setting.dark = true;
			}
		}

		const markInstance = new Mark($$.result_table_body);

		$$.search.addEventListener('keypress', function (e) {
			$$.search_tooltip.tooltip('hide');
			if (e.which === 13) {
				window.scrollTo(0, 0);
				search($$.search.value);
			}
		}, false);
		$$.search.addEventListener('blur', function () { $$.search_tooltip.tooltip('hide'); }, false);
		document.getElementById('search-btn').addEventListener('click', function () {
			window.scrollTo(0, 0);
			search($$.search.value);
		}, false);
		const search = keyword => {

			let stopwords = ['di', 'ia', 'ke', 'se', 'ada', 'apa', 'dan', 'hal', 'ini', 'itu', 'kan', 'lah', 'mau', 'nah', 'per', 'pun', 'sub', 'tak', 'agak', 'agar', 'akan', 'asal', 'atas', 'atau', 'bagi', 'baik', 'beri', 'bila', 'buat', 'cara', 'cuma', 'dari', 'demi', 'dulu', 'guna', 'ikut', 'jadi', 'jauh', 'jika', 'juga', 'kala', 'kini', 'kira', 'lagi', 'lama', 'maka', 'mana', 'mula', 'naik', 'oleh', 'pada', 'para', 'pula', 'saat', 'saja', 'sama', 'sana', 'satu', 'sela', 'sini', 'soal', 'tadi', 'tapi', 'tiap', 'tiba', 'usai', 'yang', 'bagai', 'bahwa', 'biasa', 'dalam', 'dapat', 'hanya', 'ialah', 'macam', 'masih', 'meski', 'namun', 'suatu', 'tidak', 'untuk', 'yaitu', 'adalah', 'antara', 'berupa', 'dengan', 'kepada', 'sampai', 'lihat', 'kelompok', 'kategori', 'golongan', 'subgolongan', 'subkelas', 'mencakup'],
				keysUnfiltered = [...new Set(keyword.trim().toLowerCase().replace(/,/g, ' ').replace(/\"(\w+) (\w+)\"/g, '$1+$2').split(/[\s,]+/))].filter(a => a.length),
				keys = [...keysUnfiltered],
				keysExcluded = [],
				findById = keys.length === 1 && /^\d{2,10}$/.test(keys[0]);

			if (!findById && setting.stopword) {
				keysUnfiltered.forEach(key => {
					for (let i = 0, z = stopwords.length; i < z; i++) {
						if (stopwords[i].includes(key)) {
							keysExcluded.push(stopwords[i].replace(key, `<u class="fw-7">${key}</u>`));
							break;
						}
					}
				});
				let stopwordsJoined = stopwords.join(',');
				keys = keysUnfiltered.filter(a => !stopwordsJoined.includes(a));
			}

			keys = keys.map(a => a.replace(/\+/g, ' '));

			dbg('Search: ' + keyword, 0);
			dbg({ keysUnfiltered, keys, keysExcluded });

			if ((keysUnfiltered.filter(a => a.length > 2).length || keysUnfiltered.filter(a => a.length > 1).length > 1 || keysUnfiltered.length > 3) && (setting.stopword && keysUnfiltered.length === keysExcluded.length)) {
				$$.result_summary.innerHTML = `<div class="text-danger text-center pt-45 pt-sm-5 pl-md-55"><div class="mb-4 fz-72 fz-sm-80"><div class="icon-stack-file-times animated animated-1s swing"><div></div></div></div>Kata kunci terlalu umum<div class="mt-15 text-muted fz-12 font-italic">Kata kunci yang terlalu umum tidak diikutkan dalam pencarian: ${keysExcluded.join(', ')}<br>Anda dapat mengubah pengaturan ini pada menu <span class="setting-btn-alt cur-p">pengaturan<i class="icon-settings ml-15"></i></span></div></div>`;

				setTimeout(() => {
					$$.search_tooltip.tooltip('show');
				}, document.body.classList.contains('search-active') ? 200 : 600);

				$$.result_summary.style.display = '';
				$$.result_loading.style.display = 'none';
				$$.result_loading.nextElementSibling.style.display = 'none';
				$$.result_table.style.display = 'none';
				document.body.classList.add('search-active');
				$('#result').slideDown();
			}

			else if (keys.filter(a => a.length > 2).length || keys.filter(a => a.length > 1).length > 1 || keys.length > 3 || findById) {
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
							res = [...parents, { ...node, displayed: true }, ...childs.map(a => ({ ...a, last: true }))];
							if (setting.cat.length) res = res.filter(a => setting.cat.some(cat => a.fid.startsWith(cat)));
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
							if (setting.cat.length) res = res.filter(a => setting.cat.some(cat => a.fid.startsWith(cat)));
							res.sort((a, b) => a.fid < b.fid ? -1 : 1);
						}
					}

					const b = text => `<b class="fw-6">${text}</b>`;

					if (res.length) {

						let html = res.map(b => `
							<tr data-lv="${b.lv}" data-fid="${b.fid}"
								class="desc ${b.displayed ? (b.desc.length ? 'desc-exp' : '') : 'mini'} ${b.last || b.hidden ? '' : (b.collapsed ? 'toggle' : 'toggle toggle-exp')}"
								${b.hidden ? 'style="display:none"' : ''}>
								<td><div>${b.parent_id}<b>${b.id.substr(b.parent_id.length) || b.fid}</b></div></td>
								<td><div class="desc-toggle">${b.title}</div><span class="desc-container">${descHtml(b.desc, b.id)}</span></td>
							</tr>`
						).join('');

						keysExcluded = keysExcluded.length ? `<div class="mt-15 text-muted fz-12 font-italic">Sebagian kata kunci yang terlalu umum tidak diikutkan dalam pencarian: ${keysExcluded.join(', ')}<br>Anda dapat mengubah pengaturan ini pada menu pengaturan<i class="icon-settings ml-15"></i></div>` : '';

						$$.search.blur();
						$$.result_summary.innerHTML = findById ?
							`<div>Menampilkan hasil pencarian dengan kode <span class="text-info">${b(keyword)}</span></div>` :
							`<div class="text-info">Menemukan ${b(res.filter(a => a.displayed).length)} hasil.${keysExcluded}</div>`;
						$$.result_table_body.innerHTML = html;
						$$.result_table.style.display = '';
						if (!findById && setting.highlight) keys.forEach(a => markInstance.mark(a, { separateWordSearch: false }));

						// Clipboard.js
						document.querySelectorAll('.copy-btn').forEach(a => {
							new ClipboardJS(a, { text: () => location.origin + location.pathname + '?q=' + a.dataset.text });
							a.addEventListener('click', function () {
								a.innerHTML = '<i class="fas fa-check mr-15"></i>Tautan berhasil disalin';
								a.classList.add('btn-success');
								a.classList.remove('btn-outline-warning');
								setTimeout(() => {
									a.innerHTML = '<i class="fas fa-share-alt mr-15"></i>Bagikan';
									a.classList.add('btn-outline-warning');
									a.classList.remove('btn-success');
								}, 2000);
							}, false);
						});
						if (displayNavGuide) $$.result_loading.nextElementSibling.style.display = '';
					}
					else {
						$$.result_summary.innerHTML = `<div class="text-danger text-center pt-45 pt-sm-5 pl-md-55"><div class="mb-4 fz-72 fz-sm-80"><div class="icon-stack-file-times animated animated-1s swing"><div></div></div></div>Tidak ada hasil untuk pencarian ${b(keyword)}</div>`;
					}

					$$.result_loading.style.display = 'none';
					$$.result_summary.style.display = '';

				}, document.body.classList.contains('search-active') ? 200 : 600);

				$$.result_table.style.display = 'none';
				$$.result_summary.style.display = 'none';
				$$.result_loading.style.display = '';
				$$.result_loading.nextElementSibling.style.display = 'none';
				document.body.classList.add('search-active');
				$('#result').slideDown();
				$$.search_tooltip.tooltip('hide');
			}
			else {
				if (keyword) {
					dbg('Bad keyword :(', 1);
					$$.search_tooltip.tooltip('show');
				}
				$$.search.focus();
			}
		}

		const updateSetting = (newSetting = false) => {
			if (newSetting) setting = newSetting;
			else setting = { cat: [], stopword: true, highlight: true, dark: false };
			document.getElementById('setting-btn').classList[setting.cat.length === 0 && setting.stopword ? 'remove' : 'add']('text-info');
		}
		document.getElementById('setting-btn').addEventListener('click', function () {
			$$.search_tooltip.tooltip('hide');
			let { cat, stopword, highlight, dark } = setting;
			utils.modal.init({
				title: 'Pengaturan',
				body: /*html*/`
					<div class="fw-6 mb-2">Cari pada kategori:</div>
					<div class="selectpicker-in-modal selectpicker-no-hscroll">
						<select id="setting-cat" class="selectpicker" title="Semua Kategori" data-width="100%" data-live-search="true" multiple>${data.filter(a => a.id === '').map(a => `<option value="${a.fid}" data-subtext="(${a.title})"${cat.includes(a.fid) ? ' selected' : ''}>${a.fid}</option>`).join('')}</select>
					</div>
					<div class="fw-6 mb-2 mt-4">Kata umum atau <i>stopwords</i>:</div>
					<div class="custom-control custom-switch">
						<input type="checkbox" class="custom-control-input" id="stopword-toggle"${stopword ? ' checked' : ''}>
						<label class="custom-control-label cur-p d-block" for="stopword-toggle">Abaikan kata kunci umum<div class="fz-12 fw-3">(Kata-kata umum seperti "yang", "dan", "dalam", "dari", dan lain-lain akan dikeluarkan dalam pencarian)</div></label>
					</div>
					<div class="mx--3 mt-3 mb--3 py-3 border-top" id="dark-mode-wrapper">
						<div class="px-3">
							<div class="fw-6 mb-2">Tampilan:</div>
							<div class="custom-control custom-switch mb-25">
								<input type="checkbox" class="custom-control-input" id="highlight-toggle"${highlight ? ' checked' : ''}>
								<label class="custom-control-label cur-p d-block" for="highlight-toggle">Tandai kata kunci<div class="fz-12 fw-3">(Kata kunci pada hasil pencarian akan ditandai <mark data-markjs="true">seperti ini</mark>)</div></label>
							</div>
							<div class="custom-control custom-switch">
								<input type="checkbox" class="custom-control-input" id="dark-mode-toggle"${dark ? ' checked' : ''}>
								<label class="custom-control-label cur-p d-block" for="dark-mode-toggle">Mode gelap</label>
							</div>
						</div>
					</div>
				`,
				btnLabel: 'Simpan',
				show: () => {
					document.getElementById('dark-mode-toggle').addEventListener('change', function (e) {
						if (this.checked) {
							document.body.classList.add('dark-mode');
							document.querySelector('meta[name="theme-color"]').setAttribute('content', '#202124');
						} else {
							document.body.classList.remove('dark-mode');
							document.querySelector('meta[name="theme-color"]').setAttribute('content', '#F8D800');
						}
					}, false);
				},
				action: () => {
					updateSetting({
						cat: $('#setting-cat').val(),
						stopword: document.getElementById('stopword-toggle').checked,
						highlight: document.getElementById('highlight-toggle').checked,
						dark: document.getElementById('dark-mode-toggle').checked,
					});
					utils.modal.hide();
					dbg(setting);
				},
				hide: () => {
					if (setting.dark) {
						document.body.classList.add('dark-mode');
						document.querySelector('meta[name="theme-color"]').setAttribute('content', '#202124');
						if (typeof (Storage) !== 'undefined') {
							try { localStorage.setItem('spk-dark', 1); }
							catch (error) { dbg('Cannot set local storage'); }
						}
					} else {
						document.body.classList.remove('dark-mode');
						document.querySelector('meta[name="theme-color"]').setAttribute('content', '#F8D800');
						if (typeof (Storage) !== 'undefined') localStorage.removeItem('spk-dark');
					}
					if ($$.result_summary.style.display === '') search($$.search.value);
				},
			});
		}, false);
		$$.result_summary.addEventListener('click', function (e) {
			for (var target = e.target; target && target != this; target = target.parentNode) {
				if (target.matches('.setting-btn-alt')) {
					document.getElementById('setting-btn').click();
					break;
				}
			}
		}, false);
	}

	// Explore
	document.getElementById('explore-btn').addEventListener('click', function () {
		window.scrollTo(0, 0);
		$$.search.value = '';
		$$.result_summary.style.display = 'none';
		$$.result_table.style.display = 'none';
		$$.result_loading.style.display = '';
		$$.result_loading.nextElementSibling.style.display = 'none';
		$$.search_tooltip.tooltip('hide');
		setTimeout(() => {
			$$.result_table_body.innerHTML = data.filter(a => a.id === '').map(a => `<tr data-lv="0" class="toggle toggle-explore desc" data-fid="${a.fid}"><td><div>${a.fid}</div></td><td><div class="desc-toggle">${a.title}</div><span class="desc-container">${descHtml(a.desc)}</span></td></tr>`).join('');
			$$.result_loading.style.display = 'none';
			if (displayNavGuide) $$.result_loading.nextElementSibling.style.display = '';
			$$.result_table.style.display = '';
		}, document.body.classList.contains('search-active') ? 200 : 600);
		document.body.classList.add('search-active');
		$('#result').slideDown();
	}, false);

	// Toggle
	$$.result_table_body.addEventListener('click', function (e) {
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
								class="desc ${b.last ? '' : 'toggle toggle-explore'}">
								<td>${b.parent_id}<b>${b.id.substr(b.parent_id.length)}</b></td>
								<td><div class="desc-toggle">${b.title}</div><span class="desc-container">${descHtml(b.desc, b.id)}</span></td>
							</tr>`
						).join('');
					// Clipboard.js
					document.querySelectorAll('.copy-btn').forEach(a => {
						new ClipboardJS(a, { text: () => location.origin + location.pathname + '?q=' + a.dataset.text });
						a.addEventListener('click', function () {
							a.innerHTML = '<i class="fas fa-check mr-15"></i>Tautan berhasil disalin';
							a.classList.add('btn-success');
							a.classList.remove('btn-outline-warning');
							setTimeout(() => {
								a.innerHTML = '<i class="fas fa-share-alt mr-15"></i>Bagikan';
								a.classList.add('btn-outline-warning');
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
	const descHtml = (desc, id = '') => {
		if (desc) {
			if ((desc.match(/yaitu:|adalah:|meliputi:/g) || []).length > 0) desc = desc.replace(/(\D)\s+-\s+(\D)/g, '$1<br>•&nbsp;&nbsp; $2');
			return desc
				.replace(/yaitu \:/g, 'yaitu:')
				.replace(/adalah \:/g, 'adalah:')
				.replace(/meliputi \:/g, 'meliputi:')
				.replace(/Sub ?golongan ini mencakup ?\:/g, '<div class="mb-25"></div><u>Subgolongan ini mencakup:</u>')
				.replace(/Sub ?golongan ini tidak mencakup ?\:/g, '<div class="mb-25"></div><u>Subgolongan ini tidak mencakup:</u>')
				.replace(/(CATATAN|Catatan)\s?\:/g, '<br>$1:')
				.replace(/\s+(CATATAN|Catatan)/g, '.<br>$1')
				.replace(/ -\s*\t/g, '<br>•&nbsp;&nbsp; ')
				.replace(/( \w\) )/g, '<br><span class="text-gray">$1</span> ')
				.replace(/(\d{3,9})/g, '<a href="javascript:void(0)" data-id="$1">$1</a>')
				.replace(/(\<br\>)+/g, '<br>')
				.replace(/^(\<div class\=\"mb-25\"\>\<\/div\>)/g, '')
				+ (id ? `<a href="javascript:void(0)" class="btn btn-outline-warning copy-btn" data-text="${id}"><i class="fas fa-share-alt mr-15"></i>Bagikan</a>` : '');
		}
		return '';
	}

	// Modal
	document.body.addEventListener('click', function (e) {
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
						document.getElementById('modal-btn').innerHTML = '<i class="fas fa-check mr-2"></i>Tautan berhasil disalin';
						document.getElementById('modal-btn').classList.add('btn-success');
						document.getElementById('modal-btn').classList.remove('btn-info');
						setTimeout(() => {
							document.getElementById('modal-btn').innerHTML = '<i class="fas fa-share-alt mr-2"></i>Bagikan';
							document.getElementById('modal-btn').classList.add('btn-info');
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
						<div class="w-100 text-danger text-center mt--2">Sistem tidak dapat menemukan kode <span class="fw-7">${id}</span></div>
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
	$$.search_tooltip.tooltip({
		title: 'Gunakan kata kunci yang lebih spesifik',
		trigger: 'manual',
		placement: 'bottom',
	});

	// About
	Array.from(document.getElementsByClassName('about-btn')).forEach(function (elm) {
		elm.addEventListener('click', function () {
			utils.modal.init({
				title: 'Tentang',
				body: document.getElementById('about').innerHTML,
				btnCloseLabel: 'Tutup',
				btnClass: 'd-none',
			});
		}, false);
	});

	// NavGuide
	document.getElementById('nav-guide-dismiss').addEventListener('click', function () {
		displayNavGuide = false;
		$$.result_loading.nextElementSibling.firstElementChild.classList.add('animated', 'fadeOutLeft');
		setTimeout(() => { $('#result-loading+div').slideUp(); }, 100);
	}, false);

	// Shortcut
	document.addEventListener('keypress', function (e) {
		if (e.target !== $$.search && e.key.toLocaleLowerCase() === 'f') $$.search.select();
	});

});