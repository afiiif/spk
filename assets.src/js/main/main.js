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
		var setting = { cat: [], stopword: true, dark: false };

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

			let stopwords = ['di','ia','ke','se','ada','apa','dan','hal','ini','itu','kan','lah','mau','nah','per','pun','sub','tak','agak','agar','akan','asal','atas','atau','bagi','baik','beri','bila','buat','cara','cuma','dari','demi','dulu','guna','ikut','jadi','jauh','jika','juga','kala','kini','kira','lagi','lama','maka','mana','mula','naik','oleh','pada','para','pula','saat','saja','sama','sana','satu','sela','sini','soal','tadi','tapi','tiap','tiba','usai','yang','bagai','bahwa','biasa','dalam','dapat','hanya','ialah','macam','masih','meski','namun','suatu','tidak','untuk','yaitu','adalah','antara','berupa','dengan','kepada','sampai','kelompok','kategori','golongan','subgolongan'],
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
				ELM.result_summary.innerHTML = `<div class="text-danger text-center pt-45 pt-sm-5 pl-md-55"><div class="mb-4 fz-72 fz-sm-80"><div class="icon-stack-file-times animated animated-1s swing"><div></div></div></div>Kata kunci terlalu umum<div class="mt-15 text-muted fz-12 font-italic">Kata kunci yang terlalu umum tidak diikutkan dalam pencarian: ${keysExcluded.join(', ')}<br>Anda dapat mengubah pengaturan ini pada menu pengaturan<i class="icon-settings ml-15"></i></div></div>`;

				setTimeout(() => {
					ELM.search_tooltip.tooltip('show');
				}, ELM.body.classList.contains('search-active') ? 200 : 600);

				ELM.result_summary.style.display = '';
				ELM.result_loading.style.display = 'none';
				ELM.result_table.style.display = 'none';
				ELM.body.classList.add('search-active');
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

						keysExcluded = keysExcluded.length ? `<div class="mt-15 text-muted fz-12 font-italic">Sebagian kata kunci yang terlalu umum tidak diikutkan dalam pencarian: ${keysExcluded.join(', ')}<br>Anda dapat mengubah pengaturan ini pada menu pengaturan<i class="icon-settings ml-15"></i></div>` : '';

						ELM.search.blur();
						ELM.result_summary.innerHTML = findById ?
							`<div>Menampilkan hasil pencarian dengan kode <span class="text-info">${b(keyword)}</span></div>` :
							`<div class="text-info">Menemukan ${b(res.filter(a => a.displayed).length)} hasil.${keysExcluded}</div>`;
						ELM.result_table_body.innerHTML = html;
						ELM.result_table.style.display = '';
						if (!findById) keys.forEach(a => markInstance.mark(a, { separateWordSearch: false }));

						// Clipboard.js
						document.querySelectorAll('.copy-btn').forEach(a => {
							new ClipboardJS(a, { text: () => location.origin + location.pathname + '?q=' + a.dataset.text });
							a.addEventListener('click', function () {
								a.innerHTML = '<i class="fas fa-check mr-2"></i>Tautan berhasil disalin';
								a.classList.add('btn-success');
								a.classList.remove('btn-outline-warning');
								setTimeout(() => {
									a.innerHTML = '<i class="fas fa-share-alt mr-2"></i>Bagikan';
									a.classList.add('btn-outline-warning');
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
							a.innerHTML = '<i class="fas fa-check mr-2"></i>Tautan berhasil disalin';
							a.classList.add('btn-success');
							a.classList.remove('btn-outline-warning');
							setTimeout(() => {
								a.innerHTML = '<i class="fas fa-share-alt mr-2"></i>Bagikan';
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
			if ((desc.match(/\D\s+-\s+\D/g) || []).length > 1 && (desc.match(/yaitu:|adalah:|meliputi:/g) || []).length > 0) desc = desc.replace(/(\D)\s+-\s+(\D)/g, '$1<br>•&nbsp;&nbsp; $2');
			return desc
				.replace(/yaitu \:/g, 'yaitu:')
				.replace(/adalah \:/g, 'adalah:')
				.replace(/meliputi \:/g, 'meliputi:')
				.replace(/(CATATAN|Catatan)\s?\:/g, '<br>$1:')
				.replace(/\s+(CATATAN|Catatan)/g, '.<br>$1')
				.replace(/ -\s?\t/g, '<br>•&nbsp;&nbsp; ')
				.replace(/( \w\) )/g, '<br><span class="text-gray">$1</span>&nbsp;')
				.replace(/(\d{3,9})/g, '<a href="javascript:void(0)" data-id="$1">$1</a>')
				.replace(/(\<br\>)+/g, '<br>')
			+ (id ? `<a href="javascript:void(0)" class="btn btn-outline-warning copy-btn" data-text="${id}"><i class="fas fa-link mr-15"></i>Bagikan</a>` : '');
		}
		return '';
	}

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
						document.getElementById('modal-btn').innerHTML = '<i class="fas fa-check mr-2"></i>Tautan berhasil disalin';
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